import { Module } from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { PlaylistController } from './playlist.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlaylistEntity } from './playlist.entity';
import { ContentModule } from 'src/content/content.module';

@Module({
  imports: [TypeOrmModule.forFeature([PlaylistEntity]), ContentModule],
  exports: [PlaylistService],
  providers: [PlaylistService],
  controllers: [PlaylistController],
})
export class PlaylistModule {}
