import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { getRepository } from 'typeorm';
import { UserEntity } from '../user.entity';

@ValidatorConstraint({ async: true })
export class IsEmailAlreadyExistConstraint
  implements ValidatorConstraintInterface
{
  validate(email: any) {
    const userRepo = getRepository(UserEntity);
    const foundUser = userRepo.findOneOrFail({ email: email });
    if (foundUser) return false;
    return true;
  }
}

export function IsEmailAlreadyExist(validationOptions?: ValidationOptions) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsEmailAlreadyExistConstraint,
    });
  };
}
