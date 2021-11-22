import { Controller, UseGuards } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { UserCreateEventScreenGuard } from 'src/screen/guards/userCreateEvent-Screen.guard';
import { UserCreateEventGuard } from 'src/event/guards/userCreateEvent.guard';
import { CreateScreenDto } from './dto/create-screen.dto';
import { UpdateScreenDto } from './dto/update-screen.dto';
import { UserIsOwnerScreenGuard } from './guards/userIsOwnerScreen.guard';
import { ScreenEntity } from './screen.entity';
import { ScreenService } from './screen.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Crud({
  model: {
    type: ScreenEntity,
  },

  dto: {
    create: CreateScreenDto,
    replace: UpdateScreenDto,
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
  },

  routes: {
    exclude: ['createManyBase', 'recoverOneBase', 'updateOneBase'],
    createOneBase: {
      decorators: [UseGuards(UserCreateEventGuard, UserCreateEventScreenGuard)],
    },
    replaceOneBase: {
      decorators: [UseGuards(UserIsOwnerScreenGuard)],
    },
    deleteOneBase: {
      decorators: [UseGuards(UserIsOwnerScreenGuard)],
    },
  },
})
@ApiTags('screens')
@ApiBearerAuth()
@Controller('users/:userId/events/:eventId/screens')
export class ScreenController implements CrudController<ScreenEntity> {
  constructor(public service: ScreenService) {}
}
