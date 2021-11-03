import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePlaylistDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly playlist_name: string;
}
