export interface Event {
  id: string;
  name: string;
  sport_type: string;
  date_time: string;
  description: string | null;
  venues: string[];
  color: EventColor|null;
  user_id: string;
  created_at: string;
  updated_at: string;
}

export const EVENT_COLORS = ["red", "blue", "green", "yellow", "purple", "orange"] as const;
export type EventColor = (typeof EVENT_COLORS)[number];

export interface User {
  id: string;
  email: string;
  created_at?: string;
}
