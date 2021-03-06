import { ContentEntity } from 'src/content/content.entity';
import { ScreenEntity } from 'src/screen/screen.entity';
import { UserEntity } from 'src/user/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'playlists' })
export class PlaylistEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  playlistName: string;

  @Column()
  userId: number;

  @Column()
  screenId: number;

  @ManyToOne(() => UserEntity, (user) => user.playlists)
  user: UserEntity;

  @OneToOne(() => ScreenEntity, (screen) => screen.playlist)
  @JoinColumn()
  screen: ScreenEntity;

  @ManyToMany(() => ContentEntity, (content) => content.playlists, {
    eager: true,
  })
  contents: ContentEntity[];
}
