import { Controller, UseGuards } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { AuthGuard } from 'src/user/guards/auth.guard';
import { EventEntity } from './event.entity';
import { EventService } from './event.service';
import { UserIsOwnerEventGuard } from './guards/userIsOwnerEvent.guard';

@Crud({
  model: {
    type: EventEntity,
  },
  params: {
    eventId: {
      field: 'eventId',
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
      decorators: [UseGuards(AuthGuard, UserIsOwnerEventGuard)],
    },
    deleteOneBase: {
      decorators: [UseGuards(AuthGuard, UserIsOwnerEventGuard)],
    },
  },
})
@Controller('users/:userId/events')
export class EventController implements CrudController<EventEntity> {
  constructor(public service: EventService) {}
}
