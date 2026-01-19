"use server";

import type { Event, CreateEventDTO, UpdateEventDTO, EventFiltersDTO } from "@/types";
import { createClient } from "@/lib/db";
import { requireAuth } from "@/features/auth/services/auth.service";
import { RepositoryError, NotFoundError } from "@/lib/errors";

/**
 * Get all events for the current user
 */
export async function getEvents(filters?: EventFiltersDTO): Promise<Event[]> {
  const supabase = await createClient();
  const user = await requireAuth(supabase);

  let query = supabase.from("events").select("*").eq("user_id", user.id);

  if (filters?.search) {
    query = query.ilike("name", `%${filters.search}%`);
  }

  if (filters?.sportType && filters.sportType !== "all") {
    query = query.eq("sport_type", filters.sportType);
  }

  if (filters?.dateFrom) {
    query = query.gte("date_time", filters.dateFrom);
  }

  if (filters?.dateTo) {
    query = query.lte("date_time", filters.dateTo);
  }

  query = query.order("date_time", { ascending: true });

  if (filters?.limit) {
    query = query.limit(filters.limit);
  }

  if (filters?.offset) {
    query = query.range(
      filters.offset,
      filters.offset + (filters.limit || 10) - 1
    );
  }

  const { data, error } = await query;

  if (error) {
    throw new RepositoryError(error.message);
  }

  return data as Event[];
}

/**
 * Get a single event by ID
 */
export async function getEventById(id: string): Promise<Event> {
  const supabase = await createClient();
  const user = await requireAuth(supabase);

  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (error && error.code !== "PGRST116") {
    throw new RepositoryError(error.message);
  }

  if (!data) {
    throw new NotFoundError("Event not found");
  }

  return data as Event;
}

/**
 * Create a new event
 */
export async function createEvent(dto: CreateEventDTO): Promise<Event> {
  const supabase = await createClient();
  const user = await requireAuth(supabase);

  const { data, error } = await supabase
    .from("events")
    .insert({
      name: dto.name,
      sport_type: dto.sport_type,
      date_time: dto.date_time,
      description: dto.description || null,
      venues: dto.venues,
      color: dto.color || null,
      user_id: user.id,
    })
    .select()
    .single();

  if (error) {
    throw new RepositoryError(error.message);
  }

  return data as Event;
}

/**
 * Update an existing event
 */
export async function updateEvent(
  id: string,
  dto: UpdateEventDTO
): Promise<Event> {
  const supabase = await createClient();
  const user = await requireAuth(supabase);

  const updateData: Record<string, unknown> = {};
  if (dto.name !== undefined) updateData.name = dto.name;
  if (dto.sport_type !== undefined) updateData.sport_type = dto.sport_type;
  if (dto.date_time !== undefined) updateData.date_time = dto.date_time;
  if (dto.description !== undefined)
    updateData.description = dto.description || null;
  if (dto.venues !== undefined) updateData.venues = dto.venues;
  if (dto.color !== undefined) updateData.color = dto.color || null;

  const { data, error } = await supabase
    .from("events")
    .update(updateData)
    .eq("id", id)
    .eq("user_id", user.id)
    .select()
    .single();

  if (error) {
    throw new RepositoryError(error.message);
  }

  if (!data) {
    throw new NotFoundError("Event not found");
  }

  return data as Event;
}

/**
 * Delete an event
 */
export async function deleteEvent(id: string): Promise<void> {
  const supabase = await createClient();
  const user = await requireAuth(supabase);

  const { error } = await supabase
    .from("events")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    throw new RepositoryError(error.message);
  }
}

/**
 * Get event count for the current user
 */
export async function getEventCount(): Promise<number> {
  const supabase = await createClient();
  const user = await requireAuth(supabase);

  const { count, error } = await supabase
    .from("events")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user.id);

  if (error) {
    throw new RepositoryError(error.message);
  }

  return count || 0;
}
