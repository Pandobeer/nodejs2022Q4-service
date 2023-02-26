import { Body, ClassSerializerInterceptor, Controller, Post, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @UseInterceptors(ClassSerializerInterceptor)
    @Post('/signup')
    @UsePipes(new ValidationPipe({ whitelist: true }))
    signup(@Body() createUserDto: CreateUserDto) {
        return this.authService.signup(createUserDto);
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Post('/login')
    login() {
        return this.authService.login();
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Post('/refresh')
    refresh() {
        return this.authService.refresh();
    }

}
