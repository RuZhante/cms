import { PlaylistEntity } from 'src/playlist/playlist.entity';
import { UserEntity } from 'src/user/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'contents' })
export class ContentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  tail: string;

  @Column()
  userId: number;

  @ManyToMany(() => PlaylistEntity, (playlist) => playlist.contents)
  @JoinTable()
  playlists: PlaylistEntity[];

  @ManyToOne(() => UserEntity, (user) => user.contents)
  user: UserEntity;
}
