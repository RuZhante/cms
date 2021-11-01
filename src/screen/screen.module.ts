import { Module } from '@nestjs/common';
import { ScreenService } from './screen.service';
import { ScreenController } from './screen.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScreenEntity } from './screen.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ScreenEntity])],
  providers: [ScreenService],
  exports: [ScreenService],
  controllers: [ScreenController],
})
export class ScreenMolule {}
