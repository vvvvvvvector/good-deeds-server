import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { UserEntity } from './users/user.entity';
import { ThingsModule } from './things/things.module';
import { ThingEntity } from './things/thing.entity';
import { FriendshipsModule } from './friendships/friendships.module';
import { FriendshipEntity } from './friendships/friendship.entity';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    ThingsModule,
    FriendshipsModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_POSTGRES_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_POSTGRES_USER,
      password: process.env.DB_POSTGRES_PASSWORD,
      database: process.env.DB_POSTGRES_NAME,
      entities: [UserEntity, ThingEntity, FriendshipEntity],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
