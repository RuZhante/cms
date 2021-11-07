import { Controller, UseGuards } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { UserCreateEventGuard } from 'src/event/guards/userCreateEvent.guard';
import { UserCreateEventScreenGuard } from 'src/screen/guards/userCreateEvent-Screen.guard';
import { AuthGuard } from 'src/user/guards/auth.guard';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { UserCreateEventScreenPlaylistGuard } from './guards/userCreate-Event-Screen-Playlist.guard';
import { UserIsOwnerPlaylistGuard } from './guards/userIsOwnerPlaylist.guard';
import { PlaylistEntity } from './playlist.entity';
import { PlaylistService } from './playlist.service';

@Crud({
  model: {
    type: PlaylistEntity,
  },

  dto: {
    create: CreatePlaylistDto,
    replace: UpdatePlaylistDto,
  },

  params: {
    userId: {
      field: 'userId',
      type: 'number',
    },
    eventId: {
      field: 'eventId',
      type: 'number',
    },
    screenId: {
      field: 'screenId',
      type: 'number',
    },
    playlistId: {
      field: 'playlistId',
      type: 'number',
    },
  },

  routes: {
    exclude: ['createManyBase', 'recoverOneBase', 'updateOneBase'],
    createOneBase: {
      decorators: [
        UseGuards(
          AuthGuard,
          UserCreateEventGuard,
          UserCreateEventScreenGuard,
          UserCreateEventScreenPlaylistGuard,
        ),
      ],
    },
    replaceOneBase: {
      decorators: [UseGuards(AuthGuard, UserIsOwnerPlaylistGuard)],
    },
    deleteOneBase: {
      decorators: [UseGuards(AuthGuard, UserIsOwnerPlaylistGuard)],
    },
  },
})
@Controller('users/:userId/events/:eventId/screens/:screenId/playlists')
export class PlaylistController implements CrudController<PlaylistEntity> {
  constructor(public service: PlaylistService) {}
}
