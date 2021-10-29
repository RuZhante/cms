import { UserEntity } from '../user.entity';

export class UserResponseInteface {
  user: Omit<UserEntity, 'hashPassword'> & { token: string };
}
