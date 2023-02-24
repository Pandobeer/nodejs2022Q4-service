import { HttpException, Injectable, HttpStatus, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

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

    const newUser = this.userRepository.create({
      ...createUserDto,
    });

    const result = await this.userRepository.save(newUser);

    // this.loggingService.log(`Response: ${JSON.stringify(result)}`);

    return result;
  }

  async getAllUsers() {
    const users = await this.userRepository.find();

    return users;
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new HttpException(
        `User with provided id does not exist`,
        HttpStatus.NOT_FOUND,
      );
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);

    if (user.password !== updateUserDto.oldPassword) {
      throw new HttpException(
        `Old password is incorrect`,
        HttpStatus.FORBIDDEN,
      );
    }

    Object.assign(user, { password: updateUserDto.newPassword });

    await this.userRepository.save(user);

    return user;
  }

  async delete(id: string) {
    const userToDelete = await this.userRepository.findOneBy({ id });

    if (!userToDelete) {
      throw new HttpException(
        `User with provided id does not exist`,
        HttpStatus.NOT_FOUND,
      );
    }

    return this.userRepository.delete(id);
  }
}
