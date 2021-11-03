import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateScreenDto {
  @ApiProperty()
  @IsNotEmpty()
  readonly screen_name: string;
}
