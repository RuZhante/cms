import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateScreenDto {
  @ApiProperty()
  @IsNotEmpty()
  readonly screen_name: string;
}
