import { Controller, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
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
  },

  routes: {
    exclude: ['createManyBase', 'recoverOneBase', 'updateOneBase'],
    createOneBase: {
      decorators: [UseGuards(UserCreateEventScreenPlaylistContentGuard)],
    },
    replaceOneBase: {
      decorators: [UseGuards(UserIsOwnerContentGuard)],
    },
    deleteOneBase: {
      decorators: [UseGuards(UserIsOwnerContentGuard)],
    },
  },
})
@ApiTags('contents')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('users/:userId/contents')
export class ContentController implements CrudController<ContentEntity> {
  constructor(public service: ContentService) {}
}
