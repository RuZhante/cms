import { define } from 'typeorm-seeding';
import * as Faker from 'faker';
import { UserEntity } from 'src/user/user.entity';

define(UserEntity, (faker: typeof Faker) => {
  const email = faker.internet.email();
  const password = '123';

  const user = new UserEntity();
  user.email = email;
  user.password = password;
  return user;
});
