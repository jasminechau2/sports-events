// Re-export entities
export type { Event, User } from "./entities";

// Re-export DTOs
export type {
  CreateEventDTO,
  UpdateEventDTO,
  EventFiltersDTO,
  PaginatedResponse,
  SignInDTO,
  SignUpDTO,
  AuthResponseDTO,
} from "./dto";

// Legacy exports for backward compatibility (will be removed in future)
// Using config-driven approach now via src/config/sports.config.ts
export type SportType =
  | "Soccer"
  | "Basketball"
  | "Tennis"
  | "Baseball"
  | "Football"
  | "Hockey"
  | "Golf"
  | "Swimming"
  | "Running"
  | "Volleyball"
  | "Other";

export const SPORT_TYPES: SportType[] = [
  "Soccer",
  "Basketball",
  "Tennis",
  "Baseball",
  "Football",
  "Hockey",
  "Golf",
  "Swimming",
  "Running",
  "Volleyball",
  "Other",
];

// Legacy type - use CreateEventDTO/UpdateEventDTO instead
export interface EventFormData {
  name: string;
  sport_type: SportType;
  date_time: string;
  description?: string;
  venues: string[];
}
