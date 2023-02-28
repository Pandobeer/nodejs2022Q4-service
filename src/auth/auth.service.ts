import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { compare } from 'bcryptjs';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UserService } from 'src/users/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(signupUserDto: CreateUserDto) {
    const newUser = await this.userService.createUser(signupUserDto);

    return newUser;
  }

  async login(loginUserDto: CreateUserDto) {
    const login = loginUserDto.login;
    const password = loginUserDto.password;

    const user = await this.userService.findOneByLogin(login);

    if (!user) {
      throw new ForbiddenException(`User with provided login was not found`);
    }
    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      throw new ForbiddenException(
        `User with provided login/password was not found`,
      );
    }

    const payload = { userId: user.id, login };

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: process.env.TOKEN_EXPIRE_TIME,
    });

    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
    });

    await this.userService.updateRefreshToken(user.id, refreshToken);

    return {
      accessToken,
      refreshToken,
    };
  }

  async refresh(refreshTokenDto: RefreshTokenDto) {
    const { refreshToken } = refreshTokenDto;

    const { userId, login } = this.jwtService.verify(refreshToken);

    const payload = { userId, login };

    const user = await this.userService.findOne(userId);

    const existingRefreshToken = user.refreshToken;

    if (refreshToken !== existingRefreshToken) {
      throw new UnauthorizedException('Refresh token is invalid');
    }

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: process.env.TOKEN_EXPIRE_TIME || '1h',
    });

    const updRefreshToken = this.jwtService.sign(payload, {
      expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME || '24h',
    });

    await this.userService.updateRefreshToken(userId, updRefreshToken);

    return {
      accessToken,
      refreshToken: updRefreshToken,
    };
  }
}
