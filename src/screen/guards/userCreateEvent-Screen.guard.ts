import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { EventService } from 'src/event/event.service';

@Injectable()
export class UserCreateEventScreenGuard implements CanActivate {
  constructor(private readonly eventService: EventService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const paramsEventId = request.params.eventId;
    const paramsUserId = request.params.userId;
    const userEvent = await this.eventService.findOne(paramsEventId);

    if (!userEvent)
      throw new UnprocessableEntityException('Event does not exist!');

    if (paramsUserId === userEvent.userId) return true;

    throw new UnprocessableEntityException(
      'User in params does not have Event in params',
    );
  }
}
