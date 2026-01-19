// Base DTO for event data
import { EventColor } from "@/types/entities/event.entity";


interface BaseEventDTO {
  name: string;
  sport_type: string;
  date_time: string;
  description?: string;
  venues: string[];
  color?: EventColor | null;
}

export interface CreateEventDTO extends BaseEventDTO {}

export interface UpdateEventDTO extends Partial<BaseEventDTO> {}

export interface EventFiltersDTO {
  search?: string;
  sportType?: string;
  dateFrom?: string;
  dateTo?: string;
  limit?: number;
  offset?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
