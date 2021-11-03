import { Controller, UseGuards } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { AuthGuard } from 'src/user/guards/auth.guard';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
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
      decorators: [UseGuards(AuthGuard)],
    },
    replaceOneBase: {
      decorators: [UseGuards(AuthGuard)],
    },
    deleteOneBase: {
      decorators: [UseGuards(AuthGuard)],
    },
  },
})
@Controller('users/:userId/events/:eventId/screens/:screenId/playlists')
export class PlaylistController implements CrudController<PlaylistEntity> {
  constructor(public service: PlaylistService) {}
}
