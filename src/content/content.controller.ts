import { Controller, UseGuards } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { AuthGuard } from 'src/user/guards/auth.guard';
import { ContentEntity } from './content.entity';
import { ContentService } from './content.service';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';

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
@Controller(
  'users/:userId/events/:eventId/screens/:screenId/playlists/:playlistId/contents',
)
export class ContentController implements CrudController<ContentEntity> {
  constructor(public service: ContentService) {}
}
