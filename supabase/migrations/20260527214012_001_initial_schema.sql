/*
  # BrújulaTec ITSM Initial Schema

  Creates the foundation for the vocational guidance platform.

  ## Tables Created

  1. `careers` - Engineering degree programs
     - name, tagline, description, compatibility traits, study plan, job roles, industry tags
   
  2. `questions` - Vocational test questions
     - question text, category (Hobbies/Habilidades/Materias/Situaciones), weight vectors for each career
   
  3. `teachers` - Faculty members for each career
     - name, specialty, photo, career association, years of experience
   
  4. `campus_buildings` - ITSM campus facilities
     - name, photo, labs/equipment, associated career IDs
   
  5. `user_sessions` - Anonymous test sessions
     - session ID, timestamps, device info, completion status
   
  6. `test_responses` - User answers to questions
     - session ID, question ID, response value (dislike/neutral/like)
   
  7. `chatbot_queries` - Chatbot interaction logs
     - session ID, query text, response text, timestamp, was_answered
   
  8. `admin_users` - Platform administrators
     - email, hashed password, name, role

  ## Security
  - RLS enabled on all tables
  - Public read access for careers, questions, teachers, buildings
  - Admin-only write access to core data
  - User-specific access to own session data
*/

-- Careers table
CREATE TABLE IF NOT EXISTS careers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  tagline text NOT NULL,
  description text NOT NULL,
  compatibility_traits jsonb DEFAULT '[]'::jsonb,
  study_plan jsonb DEFAULT '[]'::jsonb,
  job_roles jsonb DEFAULT '[]'::jsonb,
  industry_tags jsonb DEFAULT '[]'::jsonb,
  graduate_count integer DEFAULT 0,
  illustration_url text DEFAULT '',
  area text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Questions table
CREATE TABLE IF NOT EXISTS questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question_text text NOT NULL,
  category text NOT NULL CHECK (category IN ('Hobbies', 'Habilidades', 'Materias', 'Situaciones')),
  career_weights jsonb DEFAULT '{}'::jsonb,
  order_index integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Teachers table
CREATE TABLE IF NOT EXISTS teachers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  specialty text NOT NULL,
  photo_url text DEFAULT '',
  career_id uuid REFERENCES careers(id) ON DELETE CASCADE,
  years_experience integer DEFAULT 0,
  bio text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

-- Campus buildings table
CREATE TABLE IF NOT EXISTS campus_buildings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  photo_url text DEFAULT '',
  labs jsonb DEFAULT '[]'::jsonb,
  associated_career_ids uuid[] DEFAULT '{}',
  map_coordinates jsonb DEFAULT '{}'::jsonb,
  description text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

-- User sessions table (anonymous)
CREATE TABLE IF NOT EXISTS user_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_token text UNIQUE NOT NULL DEFAULT encode(gen_random_bytes(32), 'hex'),
  selected_career_id uuid REFERENCES careers(id) ON DELETE SET NULL,
  compatibility_scores jsonb DEFAULT '{}'::jsonb,
  test_started_at timestamptz DEFAULT now(),
  test_completed_at timestamptz,
  viewed_career_page boolean DEFAULT false,
  used_chatbot boolean DEFAULT false,
  referrer text DEFAULT '',
  user_agent text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

-- Test responses table
CREATE TABLE IF NOT EXISTS test_responses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid REFERENCES user_sessions(id) ON DELETE CASCADE,
  question_id uuid REFERENCES questions(id) ON DELETE CASCADE,
  response_value integer NOT NULL CHECK (response_value IN (-1, 0, 1)),
  created_at timestamptz DEFAULT now(),
  UNIQUE (session_id, question_id)
);

-- Chatbot queries table
CREATE TABLE IF NOT EXISTS chatbot_queries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid REFERENCES user_sessions(id) ON DELETE SET NULL,
  query_text text NOT NULL,
  response_text text DEFAULT '',
  was_answered boolean DEFAULT false,
  query_type text DEFAULT 'general',
  created_at timestamptz DEFAULT now()
);

-- Admin users table
CREATE TABLE IF NOT EXISTS admin_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  password_hash text NOT NULL,
  name text NOT NULL,
  role text DEFAULT 'admin' CHECK (role IN ('admin', 'superadmin')),
  is_active boolean DEFAULT true,
  last_login_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE careers ENABLE ROW LEVEL SECURITY;
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE teachers ENABLE ROW LEVEL SECURITY;
ALTER TABLE campus_buildings ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE test_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE chatbot_queries ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Public read policies for core data
CREATE POLICY "Public can view careers"
  ON careers FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Public can view active questions"
  ON questions FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

CREATE POLICY "Public can view teachers"
  ON teachers FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Public can view campus buildings"
  ON campus_buildings FOR SELECT
  TO anon, authenticated
  USING (true);

-- User sessions policies (anonymous access via session_token)
CREATE POLICY "Anyone can create sessions"
  ON user_sessions FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Session owner can update own session"
  ON user_sessions FOR UPDATE
  TO anon, authenticated
  USING (session_token = current_setting('request.jwt.claims', true)::json->>'session_token')
  WITH CHECK (session_token = current_setting('request.jwt.claims', true)::json->>'session_token');

CREATE POLICY "Session owner can view own session"
  ON user_sessions FOR SELECT
  TO anon, authenticated
  USING (session_token = current_setting('request.jwt.claims', true)::json->>'session_token');

-- Test responses policies
CREATE POLICY "Anyone can create responses"
  ON test_responses FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Session owner can view own responses"
  ON test_responses FOR SELECT
  TO anon, authenticated
  USING (
    session_id IN (
      SELECT id FROM user_sessions 
      WHERE session_token = current_setting('request.jwt.claims', true)::json->>'session_token'
    )
  );

-- Chatbot queries policies
CREATE POLICY "Anyone can create chatbot queries"
  ON chatbot_queries FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Session owner can view own queries"
  ON chatbot_queries FOR SELECT
  TO anon, authenticated
  USING (
    session_id IN (
      SELECT id FROM user_sessions 
      WHERE session_token = current_setting('request.jwt.claims', true)::json->>'session_token'
    )
  );

-- Admin policies (authenticated admins only)
CREATE POLICY "Admins can manage careers"
  ON careers FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM admin_users 
    WHERE id = auth.uid() AND is_active = true
  ));

CREATE POLICY "Admins can manage questions"
  ON questions FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM admin_users 
    WHERE id = auth.uid() AND is_active = true
  ));

CREATE POLICY "Admins can manage teachers"
  ON teachers FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM admin_users 
    WHERE id = auth.uid() AND is_active = true
  ));

CREATE POLICY "Admins can manage campus buildings"
  ON campus_buildings FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM admin_users 
    WHERE id = auth.uid() AND is_active = true
  ));

CREATE POLICY "Admins can view all sessions"
  ON user_sessions FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM admin_users 
    WHERE id = auth.uid() AND is_active = true
  ));

CREATE POLICY "Admins can view all responses"
  ON test_responses FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM admin_users 
    WHERE id = auth.uid() AND is_active = true
  ));

CREATE POLICY "Admins can view all chatbot queries"
  ON chatbot_queries FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM admin_users 
    WHERE id = auth.uid() AND is_active = true
  ));

CREATE POLICY "Admins can manage admin users"
  ON admin_users FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE id = auth.uid() AND is_active = true AND role = 'superadmin'
    )
    AND (
      role != 'superadmin' OR id = auth.uid()
    )
  );

CREATE POLICY "Admins can view own profile"
  ON admin_users FOR SELECT
  TO authenticated
  USING (id = auth.uid());

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_questions_category ON questions(category);
CREATE INDEX IF NOT EXISTS idx_questions_order ON questions(order_index);
CREATE INDEX IF NOT EXISTS idx_sessions_created ON user_sessions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_sessions_completed ON user_sessions(test_completed_at);
CREATE INDEX IF NOT EXISTS idx_sessions_career ON user_sessions(selected_career_id);
CREATE INDEX IF NOT EXISTS idx_responses_session ON test_responses(session_id);
CREATE INDEX IF NOT EXISTS idx_chatbot_created ON chatbot_queries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_teachers_career ON teachers(career_id);
