import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Orientation } from './common/orientation';
import { ContentEntity } from './content.entity';

@Injectable()
export class ContentService extends TypeOrmCrudService<ContentEntity> {
  constructor(@InjectRepository(ContentEntity) repo) {
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
}
