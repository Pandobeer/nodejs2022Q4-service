import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
// import { UserModule } from 'src/users/user/user.module';
import { UserService } from 'src/users/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/typeorm';
import { JwtModule } from '@nestjs/jwt/dist';
import { AuthMiddleware } from './auth.middleware';

import { config } from 'dotenv';

config();

@Module({
  providers: [AuthService, UserService, AuthMiddleware],
  controllers: [AuthController],
  imports: [TypeOrmModule.forFeature([UserEntity]),
  JwtModule.register({
    secret: process.env.JWT_SECRET_KEY,
    signOptions: {
      expiresIn: process.env.TOKEN_EXPIRE_TIME || '1h'
    }
  }),
  ],
  exports: [AuthService, JwtModule, TypeOrmModule.forFeature([UserEntity])]
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      // .exclude({ path: '/auth/signup' || '/auth/login' || '/doc' || '/', method: RequestMethod.POST })
      // .forRoutes({ path: '*', method: RequestMethod.ALL });
      .exclude({ path: '/auth/signup', method: RequestMethod.POST })
      .exclude({ path: '/auth/login', method: RequestMethod.POST })
      .exclude('/doc')
      .exclude('/')
      .forRoutes({ path: '*', method: RequestMethod.ALL });
    // .forRoutes('*');

  }
}
