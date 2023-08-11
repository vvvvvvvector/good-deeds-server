import { ApiProperty } from '@nestjs/swagger';

// we are waiting this type of object from frontend...
export class SignInUserDto {
  @ApiProperty({
    default: 'vector@gmail.com',
  })
  email: string;

  @ApiProperty({
    default: '12345678',
  })
  password: string;
}
