// Re-export entities
export type { Event, User, EventColor } from "./entities";
export { EVENT_COLORS } from "./entities";

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

export const SPORT_TYPES = [
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
] as const;

export type SportType = (typeof SPORT_TYPES)[number];
