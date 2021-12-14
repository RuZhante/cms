import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
// import { IsEmailAlreadyExistUpdate } from '../validation/CustomUpdateValidation';

export class UpdateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  // @IsEmailAlreadyExistUpdate({ message: 'Email does not exist' })
  readonly email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(6)
  readonly password: string;
}
