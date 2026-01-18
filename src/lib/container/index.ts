import { headers } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { SupabaseEventsRepository } from "@/lib/repositories";
import { SupabaseAuthService, EventsService } from "@/lib/services";
import { AuthContext } from "@/lib/providers/auth-context";
import { EventValidatorService } from "@/lib/services/validators";
import {
  GetEventsUseCase,
  CreateEventUseCase,
  UpdateEventUseCase,
  DeleteEventUseCase,
  GetEventUseCase,
} from "@/lib/use-cases/events";
import type { IEventsRepository } from "@/lib/repositories/interfaces";
import type { IAuthService, IEventsService } from "@/lib/services/interfaces";
import type { IAuthContext } from "@/lib/providers/auth-context";
import type { IEventValidator } from "@/lib/services/validators";
import type {
  IGetEventsUseCase,
  ICreateEventUseCase,
  IUpdateEventUseCase,
  IDeleteEventUseCase,
  IGetEventUseCase,
} from "@/lib/use-cases/events";

export interface Container {
  authContext: IAuthContext;
  eventsRepository: IEventsRepository;
  authService: IAuthService;
  eventsService: IEventsService;
  eventValidator: IEventValidator;
  getEventsUseCase: IGetEventsUseCase;
  getEventUseCase: IGetEventUseCase;
  createEventUseCase: ICreateEventUseCase;
  updateEventUseCase: IUpdateEventUseCase;
  deleteEventUseCase: IDeleteEventUseCase;
}

export async function createContainer(): Promise<Container> {
  const supabase = await createClient();
  const headersList = await headers();
  const origin =
    headersList.get("origin") ||
    headersList.get("x-forwarded-host") ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    "http://localhost:3000";

  const authContext = new AuthContext(supabase);
  const eventsRepository = new SupabaseEventsRepository(supabase);
  const authService = new SupabaseAuthService(supabase, origin);
  const eventsService = new EventsService(eventsRepository);
  const eventValidator = new EventValidatorService();

  return {
    authContext,
    eventsRepository,
    authService,
    eventsService,
    eventValidator,
    getEventsUseCase: new GetEventsUseCase(authContext, eventsRepository),
    getEventUseCase: new GetEventUseCase(authContext, eventsRepository),
    createEventUseCase: new CreateEventUseCase(
      authContext,
      eventsRepository,
      eventValidator
    ),
    updateEventUseCase: new UpdateEventUseCase(
      authContext,
      eventsRepository,
      eventValidator
    ),
    deleteEventUseCase: new DeleteEventUseCase(authContext, eventsRepository),
  };
}