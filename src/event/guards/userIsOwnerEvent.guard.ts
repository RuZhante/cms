import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { EventService } from '../event.service';

export class UserIsOwnerEventGuard implements CanActivate {
  constructor(private readonly eventService: EventService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const eventId = request.params.eventId;
    const currentUserId = request.user.id;

    const currentEvent = await this.eventService.findOne(eventId);

    if (currentUserId === currentEvent.user.id) return true;

    throw new HttpException('Forbidden resource!', HttpStatus.FORBIDDEN);
  }
}
