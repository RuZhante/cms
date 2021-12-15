import { IsNotEmpty, IsString } from 'class-validator';

export class FileInfoDto {
  @IsNotEmpty()
  @IsString()
  fileName: string;
}
