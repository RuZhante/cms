import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { ContentEntity } from 'src/content/content.entity';

export class CreatePlaylistDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly playlistName: string;

  @ApiProperty()
  readonly contents: ContentEntity[];
}
