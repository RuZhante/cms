import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PlaylistService } from '../playlist.service';

@Injectable()
export class UserIsOwnerPlaylistGuard implements CanActivate {
  constructor(private readonly playlistService: PlaylistService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const playlistId = request.params.id;
    const currentUserId = request.user.id;

    const currentPlaylist = await this.playlistService.findOne(playlistId);

    if (currentUserId === currentPlaylist.userId) return true;

    throw new ForbiddenException('Forbidden resource!');
  }
}
