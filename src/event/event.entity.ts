import { ScreenEntity } from 'src/screen/screen.entity';
import { UserEntity } from 'src/user/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'events' })
export class EventEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToOne(() => UserEntity, (user) => user.events)
  user: UserEntity;

  @OneToMany(() => ScreenEntity, (screen) => screen.event)
  screens: ScreenEntity[];
}
