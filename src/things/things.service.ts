import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ThingEntity } from './thing.entity';
import { Repository } from 'typeorm';
import { CreateThingDto } from './dto/create-thing.dto';

@Injectable()
export class ThingsService {
  constructor(
    @InjectRepository(ThingEntity)
    private repository: Repository<ThingEntity>,
  ) {}

  async getThingById(id: number) {
    const post = await this.repository.find({
      where: {
        id,
      },
      relations: ['user'],
    });

    return post;
  }

  getAllUserThings(userId: number) {
    const qb = this.repository.createQueryBuilder('thing');

    qb.where('thing.userId = :userId', { userId });

    return qb.getMany();
  }

  async createNewThing(userId: number, dto: CreateThingDto) {
    const thing = await this.repository.save({
      ...dto,
      user: {
        id: userId,
      },
    });

    return thing;
  }

  deleteThing(userId: number, id: number) {
    const qb = this.repository.createQueryBuilder();

    qb.where('userId = :userId AND id = :id', { id, userId });

    return qb.delete().execute();
  }

  updateThing(userId: number, id: number, dto: CreateThingDto) {
    const qb = this.repository.createQueryBuilder();

    qb.where('userId = :userId AND id = :id', { id, userId });

    return qb.update(dto).execute();
  }
}
