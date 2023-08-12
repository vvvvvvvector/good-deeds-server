import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FriendshipEntity } from './friendship.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class FriendshipsService {
  constructor(
    @InjectRepository(FriendshipEntity)
    private repository: Repository<FriendshipEntity>,
    private usersService: UsersService,
  ) {}

  async createFriendship(requesterId: number, username: string) {
    const addresseeId = await this.usersService.getUserIdByUsername(username);

    const qb = this.repository.createQueryBuilder('friendship');

    const alreadyFriends = await qb
      .where(
        'friendship.requesterId = :requesterId AND friendship.addresseeId = :addresseeId',
        { addresseeId, requesterId },
      )
      .getCount();

    if (alreadyFriends === 1) {
      throw new HttpException(
        'You already have this friend.',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (addresseeId !== requesterId) {
      const friendship = await this.repository.save({
        requester: {
          id: requesterId,
        },
        addressee: {
          id: addresseeId,
        },
      });

      return friendship;
    }

    throw new HttpException(
      "You can't add Yourself to friends.",
      HttpStatus.BAD_REQUEST,
    );
  }

  async getUserFriendsThings(id: number) {
    const user = await this.repository.find({
      where: { requester: { id } },
      relations: ['addressee', 'addressee.things'],
      select: {
        addressee: {
          username: true,
          things: true,
        },
      },
    });

    return user;
  }
}
