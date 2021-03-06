import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { EventEntity } from './event.entity';

@Injectable()
export class EventService extends TypeOrmCrudService<EventEntity> {
  constructor(@InjectRepository(EventEntity) repo) {
    super(repo);
  }
}
