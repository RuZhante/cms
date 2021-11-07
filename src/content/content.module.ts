import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContentEntity } from './content.entity';
import { ContentService } from './content.service';
import { ContentController } from './content.controller';
import { UserIsOwnerContentGuard } from './guards/userIsOwnerContent.guard';
import { PlaylistEntity } from 'src/playlist/playlist.entity';
import { ScreenEntity } from 'src/screen/screen.entity';
import { EventEntity } from 'src/event/event.entity';
import { PlaylistService } from 'src/playlist/playlist.service';
import { ScreenService } from 'src/screen/screen.service';
import { EventService } from 'src/event/event.service';
import { UserCreateEventGuard } from 'src/event/guards/userCreateEvent.guard';
import { UserCreateEventScreenGuard } from 'src/screen/guards/userCreateEvent-Screen.guard';
import { UserCreateEventScreenPlaylistGuard } from 'src/playlist/guards/userCreate-Event-Screen-Playlist.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ContentEntity,
      PlaylistEntity,
      ScreenEntity,
      EventEntity,
    ]),
  ],
  providers: [
    ContentService,
    PlaylistService,
    ScreenService,
    EventService,
    UserIsOwnerContentGuard,
    UserCreateEventGuard,
    UserCreateEventScreenGuard,
    UserCreateEventScreenPlaylistGuard,
  ],
  exports: [ContentService],
  controllers: [ContentController],
})
export class ContentModule {}
