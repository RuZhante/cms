import { EventEntity } from 'src/event/event.entity';
import { PlaylistEntity } from 'src/playlist/playlist.entity';
import { UserEntity } from 'src/user/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'screens' })
export class ScreenEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  screen_name: string;

  @Column()
  userId: number;

  @Column()
  eventId: number;

  @ManyToOne(() => UserEntity, (user) => user.screens)
  user: UserEntity;

  @ManyToOne(() => EventEntity, (event) => event.screens)
  event: ScreenEntity;

  @OneToOne(() => PlaylistEntity, (playlist) => playlist.screen)
  playlist: PlaylistEntity;
}
