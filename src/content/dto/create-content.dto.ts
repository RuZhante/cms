import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsUrl } from 'class-validator';
import { Orientation } from '../common/orientation';

export class CreateContentDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly extension: string;

  @ApiProperty()
  @IsNumber()
  readonly duration: number;

  @ApiProperty()
  orientation: Orientation;

  // @ApiProperty()
  // @IsUrl()
  // url: string;

  @IsString()
  screenResolution: string;
}
