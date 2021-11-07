import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { EventService } from 'src/event/event.service';

@Injectable()
export class UserCreateEventScreenGuard implements CanActivate {
  constructor(private readonly eventService: EventService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    // console.log(request);

    const paramsEventId = request.params.eventId;
    const paramsUserId = Number(request.params.userId);
    const userEvent = await this.eventService.findOne(paramsEventId);

    if (!userEvent)
      throw new HttpException(
        'Event does not exist!',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );

    if (paramsUserId === userEvent.userId) return true;

    throw new HttpException(
      'User in params does not have Event in params',
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }
}
