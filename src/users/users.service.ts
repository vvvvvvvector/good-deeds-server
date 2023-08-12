import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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

  async getUserById(id: number) {
    const user = await this.repository.findOne({
      where: {
        id,
      },
      select: {
        username: true,
        email: true,
      },
    });

    return user;
  }

  async getUserIdByUsername(username: string) {
    try {
      const { id } = await this.repository.findOne({
        where: {
          username,
        },
        select: {
          id: true,
        },
      });

      return id;
    } catch (error) {
      throw new NotFoundException("User with that username can't be found");
    }
  }

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
    try {
      await this.repository.update(id, { username: updated.username });
      await this.repository.update(id, { email: updated.email });

      if (updated.password !== '') {
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(updated.password, salt);

        await this.repository.update(id, {
          password: hash,
        });
      }

      return {
        message: 'success',
      };
    } catch (error) {
      console.log(error);

      throw new ForbiddenException('Error occurred while updating user.');
    }
  }
}
