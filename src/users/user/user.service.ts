import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateUserDto } from './../dto/create-user.dto';
import { UpdateUserDto } from './../dto/update-user.dto';
import { UserEntity } from 'src/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
  ) { }

  createUser(createUserDto: CreateUserDto) {
    const createdAt = Date.now();
    const updatedAt = createdAt;

    const newUser = this.userRepository.create({
      ...createUserDto,
      createdAt,
      updatedAt,
    });
    return this.userRepository.save(newUser);
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
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new HttpException(
        `User with provided id does not exist`,
        HttpStatus.NOT_FOUND,
      );
    }

    if (user.password !== updateUserDto.oldPassword) {
      throw new HttpException(
        `Old password is incorrect`,
        HttpStatus.FORBIDDEN,
      );
    }

    const updatedUser = new UserEntity({
      ...user,
      password: updateUserDto.newPassword,
      version: user.version + 1,
      updatedAt: Date.now(),
    });

    await this.userRepository.update(id, updatedUser);

    return updatedUser;
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
