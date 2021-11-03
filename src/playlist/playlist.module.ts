import { Module } from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { PlaylistController } from './playlist.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlaylistEntity } from './playlist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PlaylistEntity])],
  exports: [PlaylistService],
  providers: [PlaylistService],
  controllers: [PlaylistController],
})
export class PlaylistModule {}
