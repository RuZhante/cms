import { Module } from '@nestjs/common';
import { ScreenService } from './screen.service';
import { ScreenController } from './screen.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScreenEntity } from './screen.entity';
import { PlaylistModule } from 'src/playlist/playlist.module';
import { UserCreateEventScreenGuard } from 'src/screen/guards/userCreateEvent-Screen.guard';
import { UserIsOwnerScreenGuard } from './guards/userIsOwnerScreen.guard';
import { EventService } from 'src/event/event.service';
import { EventEntity } from 'src/event/event.entity';
import { UserCreateEventGuard } from 'src/event/guards/userCreateEvent.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([ScreenEntity, EventEntity]),
    PlaylistModule,
  ],
  providers: [
    ScreenService,
    UserCreateEventGuard,
    UserCreateEventScreenGuard,
    UserIsOwnerScreenGuard,
    EventService,
  ],
  exports: [ScreenService],
  controllers: [ScreenController],
})
export class ScreenModule {}
