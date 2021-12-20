import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { PlaylistService } from 'src/playlist/playlist.service';

@Injectable()
export class UserCreateEventScreenPlaylistContentGuard implements CanActivate {
  constructor(private readonly playlistService: PlaylistService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    console.log(request);

    const userInParamsId = request.params.userId;
    const currentUserId = request.user.id;

    if (userInParamsId === currentUserId) return true;

    throw new UnprocessableEntityException(
      'Current User is not equal with User in params',
    );
  }
}
