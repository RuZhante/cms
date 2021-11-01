import { EventEntity } from 'src/event/event.entity';
import { UserEntity } from 'src/user/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'screens' })
export class ScreenEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  screen_name: string;

  @ManyToOne(() => UserEntity, (user) => user.screens)
  user: UserEntity;

  @ManyToOne(() => EventEntity, (event) => event.screens)
  event: ScreenEntity;
}
