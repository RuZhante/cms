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

    const paramsScreenId = Number(request.params.screenId);
    const paramsPlaylistId = request.params.playlistId;
    const userPlaylist = await this.playlistService.findOne(paramsPlaylistId);

    if (!userPlaylist)
      throw new HttpException(
        'Playlist does not exist!',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );

    // console.log(userPlaylist);

    if (paramsScreenId === userPlaylist.screenId) return true;

    throw new HttpException(
      'The playlist does not belong to the current screen',
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }
}
