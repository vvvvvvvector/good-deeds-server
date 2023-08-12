import { Controller, UseGuards, Post, Get, Req, Body } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { FriendshipsService } from './friendships.service';
import { FindFriendDto } from './dto/find-friend.dto';

@Controller('friendships')
@UseGuards(AuthGuard)
@ApiBearerAuth()
@ApiTags('friendships')
export class FriendshipsController {
  constructor(private readonly friendshipsService: FriendshipsService) {}

  @Get()
  getUserFriendsThings(@Req() req) {
    return this.friendshipsService.getUserFriendsThings(req.userId);
  }

  @Post()
  createFriendship(@Req() req, @Body() dto: FindFriendDto) {
    return this.friendshipsService.createFriendship(req.userId, dto.username);
  }
}
