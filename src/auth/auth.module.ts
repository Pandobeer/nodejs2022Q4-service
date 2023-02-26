import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
// import { UserModule } from 'src/users/user/user.module';
import { UserService } from 'src/users/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/typeorm';
import { JwtModule } from '@nestjs/jwt/dist';

@Module({
  providers: [AuthService, UserService],
  controllers: [AuthController],
  imports: [TypeOrmModule.forFeature([UserEntity]),
  JwtModule.register({
    secret: process.env.JWT_SECRET_KEY,
    signOptions: {
      expiresIn: process.env.TOKEN_EXPIRE_TIME || '1h'
    }
  }),
  ],
  exports: [AuthService, JwtModule]
})
export class AuthModule { }
