import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEntity } from './event.entity';
import { ScreenModule } from 'src/screen/screen.module';
import { UserCreateEventGuard } from 'src/event/guards/userCreateEvent.guard';
import { UserIsOwnerEventGuard } from './guards/userIsOwnerEvent.guard';

@Module({
  imports: [TypeOrmModule.forFeature([EventEntity]), ScreenModule],
  providers: [EventService, UserCreateEventGuard, UserIsOwnerEventGuard],
  exports: [EventService],
  controllers: [EventController],
})
export class EventModule {}
