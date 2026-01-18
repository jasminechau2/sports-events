// Base DTO for event data
interface BaseEventDTO {
  name: string;
  sport_type: string;
  date_time: string;
  description?: string;
  venues: string[];
}

// For creating events
export interface CreateEventDTO extends BaseEventDTO {}

// For updating events (all fields optional)
export interface UpdateEventDTO extends Partial<BaseEventDTO> {}

// For filtering/searching events
export interface EventFiltersDTO {
  search?: string;
  sportType?: string;
  dateFrom?: string;
  dateTo?: string;
  limit?: number;
  offset?: number;
}

// Paginated response
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
