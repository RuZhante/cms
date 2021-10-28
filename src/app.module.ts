import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormconfig from 'src/ormconfig';

@Module({
  imports: [TypeOrmModule.forRoot(ormconfig)],
})
export class AppModule {}
