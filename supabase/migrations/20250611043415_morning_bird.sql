/*
  # Create interests and user_interests tables

  1. New Tables
    - `interests`
      - `id` (uuid, primary key)
      - `name` (text, unique)
      - `created_at` (timestamp)
    - `user_interests`
      - `user_id` (uuid, references profiles)
      - `interest_id` (uuid, references interests)
      - `created_at` (timestamp)
      - Primary key: (user_id, interest_id)

  2. Security
    - Enable RLS on both tables
    - Interests are viewable by everyone
    - Users can only manage their own interests

  3. Sample Data
    - Insert common interests for users to select from
*/

-- Create interests table
CREATE TABLE IF NOT EXISTS interests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create user_interests junction table
CREATE TABLE IF NOT EXISTS user_interests (
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  interest_id uuid NOT NULL REFERENCES interests(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  PRIMARY KEY (user_id, interest_id)
);

-- Enable RLS
ALTER TABLE interests ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_interests ENABLE ROW LEVEL SECURITY;

-- Create policies for interests
CREATE POLICY "Interests are viewable by everyone" ON interests
  FOR SELECT USING (true);

-- Create policies for user_interests
CREATE POLICY "Users can view their interests" ON user_interests
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their interests" ON user_interests
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can manage their own interests" ON user_interests
  FOR ALL USING (auth.uid() = user_id);

-- Insert sample interests
INSERT INTO interests (name) VALUES
  ('Artificial Intelligence'),
  ('Machine Learning'),
  ('Data Science'),
  ('Computer Science'),
  ('Physics'),
  ('Mathematics'),
  ('Biology'),
  ('Chemistry'),
  ('Neuroscience'),
  ('Psychology'),
  ('Philosophy'),
  ('History'),
  ('Economics'),
  ('Business'),
  ('Engineering'),
  ('Medicine'),
  ('Astronomy'),
  ('Climate Science'),
  ('Quantum Computing'),
  ('Robotics'),
  ('Biotechnology'),
  ('Cybersecurity'),
  ('Blockchain'),
  ('Renewable Energy'),
  ('Space Technology')
ON CONFLICT (name) DO NOTHING;