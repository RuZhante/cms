import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { ScreenService } from '../screen.service';

@Injectable()
export class UserIsOwnerScreenGuard implements CanActivate {
  constructor(private readonly screenService: ScreenService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const screenId = request.params.id;
    const currentUserId = request.user.id;

    const currentScreen = await this.screenService.findOne(screenId);

    if (currentUserId === currentScreen.userId) return true;

    throw new HttpException('Forbidden resource!', HttpStatus.FORBIDDEN);
  }
}
