import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/typeorm';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) { }

    async signup(createUserDto: CreateUserDto) {
        const newUser = this.userRepository.create({
            ...createUserDto,
        });

        return await this.userRepository.save(newUser);
    }

    login() { }

    refresh() { }
}
