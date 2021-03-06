import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateEventDto {
  @ApiProperty()
  @IsNotEmpty()
  readonly title: string;

  // @IsNotEmpty()
  // userId: number;
}
