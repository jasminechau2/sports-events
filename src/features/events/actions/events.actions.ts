"use server";

import { revalidatePath } from "next/cache";
import {
  executeServerAction,
  executeServerActionVoid,
  type ServerActionResult,
  type ServerActionResultVoid,
} from "@/lib/actions";
import * as eventsService from "../services/events.service";
import type { Event, CreateEventDTO, UpdateEventDTO } from "@/types";

export async function getEvents(params?: {
  search?: string;
  sportType?: string | "all";
}): Promise<ServerActionResult<Event[]>> {
  return executeServerAction(async () => {
    const filters = params
      ? {
          search: params.search,
          sportType:
            params.sportType && params.sportType !== "all"
              ? params.sportType
              : undefined,
        }
      : undefined;
    return eventsService.getEvents(filters);
  });
}

export async function getEvent(id: string): Promise<ServerActionResult<Event>> {
  return executeServerAction(async () => {
    return eventsService.getEventById(id);
  });
}

export async function createEvent(
  formData: CreateEventDTO
): Promise<ServerActionResult<Event>> {
  return executeServerAction(async () => {
    const event = await eventsService.createEvent(formData);
    revalidatePath("/dashboard");
    return event;
  });
}

export async function updateEvent(
  id: string,
  formData: UpdateEventDTO
): Promise<ServerActionResult<Event>> {
  return executeServerAction(async () => {
    const event = await eventsService.updateEvent(id, formData);
    revalidatePath("/dashboard");
    revalidatePath(`/events/${id}/edit`);
    return event;
  });
}

export async function deleteEvent(
  id: string
): Promise<ServerActionResultVoid> {
  return executeServerActionVoid(async () => {
    await eventsService.deleteEvent(id);
    revalidatePath("/dashboard");
  });
}