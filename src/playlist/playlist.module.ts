import { Module } from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { PlaylistController } from './playlist.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlaylistEntity } from './playlist.entity';
import { ContentModule } from 'src/content/content.module';
import { UserIsOwnerPlaylistGuard } from './guards/userIsOwnerPlaylist.guard';
import { ScreenEntity } from 'src/screen/screen.entity';
import { ScreenService } from 'src/screen/screen.service';
import { UserCreateEventScreenPlaylistGuard } from './guards/userCreate-Event-Screen-Playlist.guard';
import { EventEntity } from 'src/event/event.entity';
import { UserCreateEventGuard } from 'src/event/guards/userCreateEvent.guard';
import { UserCreateEventScreenGuard } from 'src/screen/guards/userCreateEvent-Screen.guard';
import { EventService } from 'src/event/event.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([PlaylistEntity, ScreenEntity, EventEntity]),
    ContentModule,
  ],
  exports: [PlaylistService],
  providers: [
    PlaylistService,
    ScreenService,
    EventService,
    UserCreateEventGuard,
    UserCreateEventScreenGuard,
    UserCreateEventScreenPlaylistGuard,
    UserIsOwnerPlaylistGuard,
  ],
  controllers: [PlaylistController],
})
export class PlaylistModule {}
