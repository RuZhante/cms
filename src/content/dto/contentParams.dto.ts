import { ApiProperty } from '@nestjsx/crud/lib/crud';
import { IsString } from 'class-validator';
import { Orientation } from '../common/orientation';

export class ContentParamsDto {
  @ApiProperty()
  orientation: Orientation;

  @IsString()
  screenResolution: string;
}
