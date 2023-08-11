import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SignInUserDto } from 'src/users/dto/signin-user.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  signIn(@Body() dto: SignInUserDto) {
    return this.authService.login(dto);
  }

  @Post('signup')
  signUp(@Body() dto: CreateUserDto) {
    return this.authService.registration(dto);
  }
}
