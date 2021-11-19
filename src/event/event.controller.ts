import { Controller, UseGuards } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { EventEntity } from './event.entity';
import { EventService } from './event.service';
import { UserCreateEventGuard } from './guards/userCreateEvent.guard';
import { UserIsOwnerEventGuard } from './guards/userIsOwnerEvent.guard';

@Crud({
  model: {
    type: EventEntity,
  },

  dto: {
    create: CreateEventDto,
    replace: UpdateEventDto,
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
  },

  routes: {
    exclude: ['createManyBase', 'recoverOneBase', 'updateOneBase'],
    createOneBase: {
      decorators: [UseGuards(UserCreateEventGuard)],
    },
    replaceOneBase: {
      decorators: [UseGuards(UserIsOwnerEventGuard)],
    },
    deleteOneBase: {
      decorators: [UseGuards(UserIsOwnerEventGuard)],
    },
  },
})
@Controller('users/:userId/events')
export class EventController implements CrudController<EventEntity> {
  constructor(public service: EventService) {}
}
