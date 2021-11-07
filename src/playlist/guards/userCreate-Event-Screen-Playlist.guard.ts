import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { ScreenService } from 'src/screen/screen.service';

@Injectable()
export class UserCreateEventScreenPlaylistGuard implements CanActivate {
  constructor(private readonly screenService: ScreenService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    // console.log(request);

    const paramsEventId = Number(request.params.eventId);
    const paramsScreenId = request.params.screenId;
    const userScreen = await this.screenService.findOne(paramsScreenId);

    if (!userScreen)
      throw new HttpException(
        'Screen does not exist!',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );

    if (paramsEventId === userScreen.eventId) return true;

    throw new HttpException(
      'Event in params does not have this Screen',
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }
}
