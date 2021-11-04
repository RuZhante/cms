import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { ContentEntity } from './content.entity';

@Injectable()
export class ContentService extends TypeOrmCrudService<ContentEntity> {
  constructor(@InjectRepository(ContentEntity) repo) {
    super(repo);
  }
}
