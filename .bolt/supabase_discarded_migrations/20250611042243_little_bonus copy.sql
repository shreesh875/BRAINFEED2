/*
  # Fix Database Schema Issues

  1. Database Structure Fixes
    - Remove invalid foreign key reference to non-existent users table
    - Create proper trigger function for new user handling
    - Fix user_interests table structure to work with interests table
    
  2. Data Setup
    - Insert default interests data
    - Ensure proper RLS policies
    
  3. Trigger Setup
    - Create handle_new_user function to automatically create profiles
*/

-- First, let's fix the profiles table by removing the invalid foreign key
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'profiles_id_fkey' 
    AND table_name = 'profiles'
  ) THEN
    ALTER TABLE profiles DROP CONSTRAINT profiles_id_fkey;
  END IF;
END $$;

-- Create the handle_new_user function
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, username, full_name, avatar_url, points, streak, onboarding_completed)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', 'user_' || substr(NEW.id::text, 1, 8)),
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'New User'),
    NEW.raw_user_meta_data->>'avatar_url',
    0,
    0,
    false
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Insert default interests if they don't exist
INSERT INTO interests (name) VALUES
  ('Artificial Intelligence'),
  ('Machine Learning'),
  ('Data Science'),
  ('Quantum Physics'),
  ('Astronomy'),
  ('Biology'),
  ('Chemistry'),
  ('Mathematics'),
  ('Computer Science'),
  ('Neuroscience'),
  ('Psychology'),
  ('Economics')
ON CONFLICT (name) DO NOTHING;

-- Fix user_interests table to properly reference interests table
DO $$
BEGIN
  -- Check if the foreign key constraint exists and points to the right table
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints tc
    JOIN information_schema.key_column_usage kcu ON tc.constraint_name = kcu.constraint_name
    JOIN information_schema.constraint_column_usage ccu ON tc.constraint_name = ccu.constraint_name
    WHERE tc.table_name = 'user_interests' 
    AND tc.constraint_type = 'FOREIGN KEY'
    AND ccu.table_name = 'interests'
    AND kcu.column_name = 'interest_id'
  ) THEN
    -- Add the correct foreign key if it doesn't exist
    ALTER TABLE user_interests 
    ADD CONSTRAINT user_interests_interest_id_fkey 
    FOREIGN KEY (interest_id) REFERENCES interests(id) ON DELETE CASCADE;
  END IF;
END $$;

-- Ensure RLS is enabled on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE interests ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_interests ENABLE ROW LEVEL SECURITY;
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;

-- Add missing RLS policies for interests
CREATE POLICY "Interests are viewable by everyone" ON interests
  FOR SELECT TO public USING (true);

-- Update user_interests policies to be more permissive for authenticated users
DROP POLICY IF EXISTS "Users can insert their interests" ON user_interests;
DROP POLICY IF EXISTS "Users can manage their interests" ON user_interests;
DROP POLICY IF EXISTS "Users can manage their own interests" ON user_interests;
DROP POLICY IF EXISTS "Users can view their interests" ON user_interests;

CREATE POLICY "Users can manage their own interests" ON user_interests
  FOR ALL TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own interests" ON user_interests
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id);