import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { EventService } from '../event.service';

@Injectable()
export class UserIsOwnerEventGuard implements CanActivate {
  constructor(private readonly eventService: EventService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const eventId = request.params.id;
    const currentUserId = request.user.id;

    const currentEvent = await this.eventService.findOne(eventId);

    if (currentUserId === currentEvent.userId) return true;

    throw new ForbiddenException('Forbidden resource!');
  }
}
