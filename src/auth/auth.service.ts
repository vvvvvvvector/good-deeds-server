import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { SignInUserDto } from 'src/users/dto/signin-user.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(dto: SignInUserDto) {
    const { id } = await this.validateUser(dto);

    return this.generateJWT(id);
  }

  async registration(dto: CreateUserDto) {
    const user = await this.usersService.getUserByEmail(dto.email);

    if (user) {
      throw new HttpException(
        'User with that email already exists.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(dto.password, salt);

    const { id } = await this.usersService.createUser({
      ...dto,
      password: hash,
    });

    return {
      ...this.generateJWT(id),
      message: 'success',
    };
  }

  private generateJWT(id: number) {
    const payload = { id };

    return { token: this.jwtService.sign(payload) };
  }

  private async validateUser(dto: SignInUserDto) {
    const user = await this.usersService.getUserByEmail(dto.email);

    if (!user) {
      throw new UnauthorizedException({
        message: 'Wrong username or password.',
      });
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException({
        message: 'Wrong username or password.',
      });
    }

    return user;
  }
}
