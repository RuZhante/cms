import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { AwsService } from 'src/aws/aws.service';
import { Orientation } from './common/orientation';
import { ContentEntity } from './content.entity';
import { FileInfoDto } from './dto/fileInfo.dto';

@Injectable()
export class ContentService extends TypeOrmCrudService<ContentEntity> {
  constructor(
    @InjectRepository(ContentEntity) repo,
    private readonly awsService: AwsService,
  ) {
    super(repo);
  }

  async getContentsWithParams(
    orientation: Orientation,
    screenResolution: string,
  ): Promise<ContentEntity[]> {
    const contents = await this.repo.find({
      where: { orientation: orientation, screenResolution: screenResolution },
    });
    return contents;
  }

  async uploadPublicContent(fileInfo: FileInfoDto) {
    const url = await this.awsService.uploadPublicContent(fileInfo);
    return url;
  }
}
