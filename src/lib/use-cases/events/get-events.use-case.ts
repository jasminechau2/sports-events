import type { IEventsRepository } from "@/lib/repositories/interfaces";
import type { IAuthContext } from "@/lib/providers/auth-context";
import type { Event } from "@/types";

export interface IGetEventsUseCase {
  execute(): Promise<Event[]>;
}

export class GetEventsUseCase implements IGetEventsUseCase {
  constructor(
    private readonly authContext: IAuthContext,
    private readonly eventsRepository: IEventsRepository
  ) {}

  async execute(): Promise<Event[]> {
    const user = await this.authContext.requireAuth();
    return this.eventsRepository.findAll(user.id);
  }
}