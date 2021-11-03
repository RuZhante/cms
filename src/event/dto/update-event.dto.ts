import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateEventDto {
  @ApiProperty()
  @IsNotEmpty()
  readonly title: string;
}
