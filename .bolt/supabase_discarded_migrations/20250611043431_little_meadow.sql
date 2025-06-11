/*
  # Update profiles table policies

  1. Changes
    - Add INSERT policy for profiles (users can create their own profile)
    - Ensure all CRUD operations are properly covered

  2. Security
    - Users can create their own profile during signup
    - Users can read any profile (for leaderboards, etc.)
    - Users can only update their own profile
*/

-- Add INSERT policy for profiles
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'profiles' 
    AND policyname = 'Users can create their own profile'
  ) THEN
    CREATE POLICY "Users can create their own profile" ON profiles
      FOR INSERT WITH CHECK (auth.uid() = id);
  END IF;
END $$;