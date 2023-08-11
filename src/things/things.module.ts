import { Module } from '@nestjs/common';
import { ThingsService } from './things.service';
import { ThingsController } from './things.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThingEntity } from './thing.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([ThingEntity]), AuthModule],
  providers: [ThingsService],
  controllers: [ThingsController],
})
export class ThingsModule {}
