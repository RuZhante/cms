import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEntity } from './event.entity';
import { ScreenMolule } from 'src/screen/screen.module';

@Module({
  imports: [TypeOrmModule.forFeature([EventEntity]), ScreenMolule],
  providers: [EventService],
  exports: [EventService],
  controllers: [EventController],
})
export class EventModule {}
