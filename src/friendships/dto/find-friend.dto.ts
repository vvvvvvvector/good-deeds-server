import { ApiProperty } from '@nestjs/swagger';

// we are waiting this type of object from frontend...
export class FindFriendDto {
  @ApiProperty()
  username: string;
}
