import { Controller, UseGuards } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { AuthGuard } from 'src/user/guards/auth.guard';
import { UserIsOwnerScreenGuard } from './guards/userIsOwnerScreen.guard';
import { ScreenEntity } from './screen.entity';
import { ScreenService } from './screen.service';

@Crud({
  model: {
    type: ScreenEntity,
  },
  params: {
    screenId: {
      field: 'screenId',
      type: 'number',
      primary: true,
    },
  },
  routes: {
    exclude: ['createManyBase', 'recoverOneBase', 'updateOneBase'],
    createOneBase: {
      decorators: [UseGuards(AuthGuard)],
    },
    replaceOneBase: {
      decorators: [UseGuards(AuthGuard, UserIsOwnerScreenGuard)],
    },
    deleteOneBase: {
      decorators: [UseGuards(AuthGuard, UserIsOwnerScreenGuard)],
    },
  },
})
@Controller('users/:userId/events/eventId/screens')
export class ScreenController implements CrudController<ScreenEntity> {
  constructor(public service: ScreenService) {}
}
