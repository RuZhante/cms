import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
// import { IsEmailAlreadyExist } from '../validation/CustomCreateValidation';

export class CreateUserDto {
  @ApiProperty()
  // @IsNotEmpty()
  @IsEmail()
  // @IsEmailAlreadyExist({
  //   message: 'Email already exists. Choose another email.',
  // })
  readonly email: string;

  @ApiProperty()
  // @IsNotEmpty()
  @IsString()
  @Length(6)
  readonly password: string;
}
