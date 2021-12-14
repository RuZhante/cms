import { define } from 'typeorm-seeding';
import * as Faker from 'faker';
import { UserEntity } from 'src/user/user.entity';

define(UserEntity, (faker: typeof Faker) => {
  const id = faker.lorem.word();
  // const password = '1234567';

  const user = new UserEntity();
  user.id = id;
  return user;
});
