import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ScreenService } from 'src/screen/screen.service';

@Injectable()
export class UserCreateEventScreenPlaylistGuard implements CanActivate {
  constructor(private readonly screenService: ScreenService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const paramsScreenId = request.params.screenId;
    const userScreen = await this.screenService.findOne(paramsScreenId);

    if (!userScreen) {
      throw new UnprocessableEntityException('Screen does not exist!');
    }
    return true;
  }
}
