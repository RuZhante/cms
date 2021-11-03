import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdatePlaylistDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly playlist_name: string;
}
