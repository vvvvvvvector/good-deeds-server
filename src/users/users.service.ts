import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private repository: Repository<UserEntity>,
  ) {}

  async getUserByEmail(email: string) {
    const user = await this.repository.findOneBy({
      email,
    });

    return user;
  }

  async createUser(dto: CreateUserDto) {
    const user = await this.repository.save(dto);

    return user;
  }

  async deleteUser(id: number) {
    const user = await this.repository.delete(id);

    if (user.affected === 1) {
      return {
        message: 'success',
      };
    }

    throw new ForbiddenException('Error occurred while deleting user.');
  }

  async updateUser(id: number, updated: CreateUserDto) {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(updated.password, salt);

    const user = await this.repository.update(id, {
      ...updated,
      password: hash,
    });

    if (user.affected === 1) {
      return {
        message: 'success',
      };
    }

    throw new ForbiddenException('Error occurred while updating user.');
  }
}
