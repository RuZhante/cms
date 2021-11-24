import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { PlaylistService } from 'src/playlist/playlist.service';

@Injectable()
export class UserCreateEventScreenPlaylistContentGuard implements CanActivate {
  constructor(private readonly playlistService: PlaylistService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    console.log(request);

    const userInParamsId = Number(request.params.userId);
    const currentUserId = request.user.id;

    if (userInParamsId === currentUserId) return true;

    throw new HttpException(
      'Current User is not equal with User in params',
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }
}
