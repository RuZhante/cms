import { Controller, UseGuards } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { UserCreateEventGuard } from 'src/event/guards/userCreateEvent.guard';
import { UserCreateEventScreenPlaylistGuard } from 'src/playlist/guards/userCreate-Event-Screen-Playlist.guard';
import { UserCreateEventScreenGuard } from 'src/screen/guards/userCreateEvent-Screen.guard';
import { AuthGuard } from 'src/user/guards/auth.guard';
import { ContentEntity } from './content.entity';
import { ContentService } from './content.service';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';
import { UserCreateEventScreenPlaylistContentGuard } from './guards/userCreate-Event-Screen-Playlist-Content.guard';
import { UserIsOwnerContentGuard } from './guards/userIsOwnerContent.guard';

@Crud({
  model: {
    type: ContentEntity,
  },

  dto: {
    create: CreateContentDto,
    replace: UpdateContentDto,
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
    contentId: {
      field: 'contentId',
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
          UserCreateEventScreenPlaylistContentGuard,
        ),
      ],
    },
    replaceOneBase: {
      decorators: [UseGuards(AuthGuard, UserIsOwnerContentGuard)],
    },
    deleteOneBase: {
      decorators: [UseGuards(AuthGuard, UserIsOwnerContentGuard)],
    },
  },
})
@Controller(
  'users/:userId/events/:eventId/screens/:screenId/playlists/:playlistId/contents',
)
export class ContentController implements CrudController<ContentEntity> {
  constructor(public service: ContentService) {}
}
