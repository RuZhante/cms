import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ScreenService } from '../screen.service';

export class UserIsOwnerScreenGuard implements CanActivate {
  constructor(private readonly screenService: ScreenService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const screenId = request.params.screenId;
    const currentUserId = request.user.id;

    const currentScreen = await this.screenService.findOne(screenId);

    if (currentUserId === currentScreen.user.id) return true;

    throw new HttpException('Forbidden resource!', HttpStatus.FORBIDDEN);
  }
}
