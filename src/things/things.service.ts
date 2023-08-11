import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ThingEntity } from './thing.entity';
import { Equal, Repository } from 'typeorm';
import { CreateThingDto } from './dto/create-thing.dto';

@Injectable()
export class ThingsService {
  constructor(
    @InjectRepository(ThingEntity)
    private repository: Repository<ThingEntity>,
  ) {}

  async getAllUserThings(userId: number) {
    const things = await this.repository.find();

    return things;
  }

  async createNewThing(userId: number, dto: CreateThingDto) {
    const thing = await this.repository.save({ userId, ...dto });

    return thing;
  }

  async deleteThing() {}

  async updateThing() {}
}
