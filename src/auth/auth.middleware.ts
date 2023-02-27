import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';
import { UserService } from 'src/users/user/user.service';
import { UserEntity } from 'src/typeorm';

interface AuthRequest extends Request {
    user: UserEntity;
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UserService,
    ) { }

    async use(req: AuthRequest, res: Response, next: NextFunction) {
        const pathsToExclude = ['/auth/signup', '/auth/login', '/doc', '/'];

        if (pathsToExclude.includes(req.path)) {
            return next();
        }

        const authorizationHeader = req.headers.authorization;

        console.log(1, req.headers, 'hi');
        console.log(2, authorizationHeader, 'hi');

        if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
            throw new UnauthorizedException('Invalid or absent authorization header');
        }

        const tokenFromHeader = authorizationHeader.split(' ')[1];
        console.log(3, tokenFromHeader, 'hi');

        try {
            const decodedToken = await this.jwtService.verifyAsync(tokenFromHeader);
            const user = await this.userService.findOne(decodedToken.id);

            if (!user) {
                throw new UnauthorizedException('Invalid token');
            }

            req.user = user;

            next();
        } catch (err) {
            throw new UnauthorizedException(`Invalid access token: ${err.message}`);
        }
    }
}
