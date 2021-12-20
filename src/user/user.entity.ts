import { Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { EventEntity } from 'src/event/event.entity';
import { ScreenEntity } from 'src/screen/screen.entity';
import { PlaylistEntity } from 'src/playlist/playlist.entity';
import { ContentEntity } from 'src/content/content.entity';

@Entity({ name: 'users' })
export class UserEntity {
  @ApiProperty()
  @PrimaryColumn('varchar')
  id: string;

  @OneToMany(() => EventEntity, (event) => event.user)
  events: EventEntity[];

  @OneToMany(() => ScreenEntity, (screen) => screen.user)
  screens: ScreenEntity[];

  @OneToMany(() => PlaylistEntity, (playlist) => playlist.user)
  playlists: PlaylistEntity[];

  @OneToMany(() => ContentEntity, (content) => content.user)
  contents: ContentEntity[];
}
