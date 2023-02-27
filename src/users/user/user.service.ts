import { HttpException, Injectable, HttpStatus, Logger, ForbiddenException, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';

import { CreateUserDto } from './../dto/create-user.dto';
import { UpdateUserDto } from './../dto/update-user.dto';
import { UserEntity } from 'src/typeorm';
import { MyLogger } from 'src/logger/logger.servise';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    // private readonly loggingService: MyLogger,
  ) { }

  // private readonly logger = new Logger(UserService.name);

  async createUser(createUserDto: CreateUserDto) {
    // this.loggingService.log(`Request body: ${JSON.stringify(createUserDto)}`);

    const hashedPassword = await bcrypt.hash(createUserDto.password, Number(process.env.CRYPT_SALT || 10));

    const newUser = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword
    });

    return await this.userRepository.save(newUser);

    // this.loggingService.log(`Response: ${JSON.stringify(result)}`);

    // return result;
  }

  async getAllUsers() {
    const users = await this.userRepository.find();

    return users;
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException(
        `User with provided id does not exist`,
        // HttpStatus.NOT_FOUND,
      );
    }

    return user;
  }

  async findOneByLogin(login: string) {
    const user = await this.userRepository.findOneBy({ login });

    if (!user) {
      throw new ForbiddenException(
        `User with provided login was not found`,
      );
      // throw new HttpException(
      //   `User with provided login was not found`,
      //   HttpStatus.BAD_REQUEST
      // );
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);

    const matchPasswords = await bcrypt.compare(updateUserDto.oldPassword, user.password);

    if (!matchPasswords) {
      throw new ForbiddenException(
        // throw new ForbiddenException(

        `Old password is incorrect`,
        // HttpStatus.FORBIDDEN,
      );
    }

    Object.assign(user, { password: updateUserDto.newPassword });

    await this.userRepository.save(user);

    return user;
  }

  async delete(id: string) {
    const userToDelete = await this.userRepository.findOneBy({ id });

    if (!userToDelete) {
      throw new NotFoundException(
        `User with provided id does not exist`,
        // HttpStatus.NOT_FOUND,
      );
    }

    return this.userRepository.delete(id);
  }

  async updateRefreshToken(userId: string, updRefreshToken: string): Promise<void> {
    const user = await this.userRepository.findOneByOrFail({ id: userId }).catch(() => {
      throw new NotFoundException(`User with ID "${userId}" was not found`);
    });

    user.refreshToken = updRefreshToken;
    console.log(10, user.refreshToken);

    await this.userRepository.save(user);
  }
}
