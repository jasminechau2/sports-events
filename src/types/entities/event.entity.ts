export interface Event {
  id: string;
  name: string;
  sport_type: string;
  date_time: string;
  description: string | null;
  venues: string[];
  user_id: string;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: string;
  email: string;
  created_at?: string;
}
