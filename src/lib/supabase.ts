import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Career = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  area: string;
  compatibility_traits: string[];
  job_roles: string[];
  industry_tags: string[];
  graduate_count: number;
  study_plan: Array<{ semester: number; subjects: string[] }>;
  illustration_url: string;
};

export type Question = {
  id: string;
  question_text: string;
  category: 'Hobbies' | 'Habilidades' | 'Materias' | 'Situaciones';
  career_weights: Record<string, number>;
  order_index: number;
};

export type Teacher = {
  id: string;
  name: string;
  specialty: string;
  photo_url: string;
  career_id: string;
  years_experience: number;
  bio: string;
};

export type CampusBuilding = {
  id: string;
  name: string;
  photo_url: string;
  labs: string[];
  associated_career_ids: string[];
  map_coordinates: { x: number; y: number };
  description: string;
};

export type UserSession = {
  id: string;
  session_token: string;
  selected_career_id: string | null;
  compatibility_scores: Record<string, number>;
  test_started_at: string;
  test_completed_at: string | null;
  viewed_career_page: boolean;
  used_chatbot: boolean;
};

export type TestResponse = {
  id: string;
  session_id: string;
  question_id: string;
  response_value: -1 | 0 | 1;
};

export type ChatbotQuery = {
  id: string;
  session_id: string;
  query_text: string;
  response_text: string;
  was_answered: boolean;
  query_type: string;
  created_at: string;
};
