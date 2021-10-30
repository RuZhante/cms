import { UserType } from './user.type';

export class UserResponseInteface {
  user: UserType & { token: string };
}
