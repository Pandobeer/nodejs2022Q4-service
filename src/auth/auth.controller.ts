import { Body, ClassSerializerInterceptor, Controller, HttpCode, Post, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { ApiResponse } from '@nestjs/swagger/dist';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @UseInterceptors(ClassSerializerInterceptor)
    @Post('/signup')
    @UsePipes(new ValidationPipe({ whitelist: true }))
    signup(@Body() signupUserDto: CreateUserDto) {
        return this.authService.signup(signupUserDto);
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Post('/login')
    @ApiResponse({ description: 'User successfully logged in' })
    @HttpCode(200)
    @UsePipes(new ValidationPipe({ whitelist: true }))
    login(@Body() loginUserDto: CreateUserDto) {
        return this.authService.login(loginUserDto);
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Post('/refresh')
    @HttpCode(200)
    @UsePipes(new ValidationPipe({ whitelist: true }))
    refresh(@Body() refreshTokenDto: RefreshTokenDto) {
        return this.authService.refresh(refreshTokenDto);
    }

}
