import { Module } from '@nestjs/common';
import { FriendshipsController } from './friendships.controller';
import { FriendshipEntity } from './friendship.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FriendshipsService } from './friendships.service';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([FriendshipEntity]),
    UsersModule,
    AuthModule,
  ],
  providers: [FriendshipsService],
  controllers: [FriendshipsController],
})
export class FriendshipsModule {}
