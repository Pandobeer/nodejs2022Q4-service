import { HttpException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateUserDto } from './../dto/create-user.dto';
import { UpdateUserDto } from './../dto/update-user.dto';
// import InMemoryUsersStorage from './../store/users.storage';
import { UserEntity } from 'src/typeorm';
import { HttpStatus } from '@nestjs/common/enums';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
  ) { }

  // create(createUserDto: CreateUserDto) {
  //   return this.usersStore.create(createUserDto);
  // }

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

  // getAllUsers() {
  //   return this.usersStore.getAll();
  // }

  async getAllUsers() {
    const users = await this.userRepository.find();
    return users;
    // return this.userRepository.getAllUsers().map((user) => new UserEntity(user));

  }

  // findOne(id: string) {
  //   return this.usersStore.findById(id);
  // }

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

  // update(id: string, updateUserDto: UpdateUserDto) {
  //   return this.usersStore.update(id, updateUserDto);
  // }

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

  // remove(id: string) {
  //   return this.usersStore.delete(id);
  // }

  // delete(id: string): void {
  //   this.usersStore.delete(id);
  // }

  async delete(id: string) {
    const userToDelete = await this.userRepository.findOneBy({ id });

    // if (!id) {
    //   throw new HttpException(`Invalid userId`, HttpStatus.BAD_REQUEST);
    // }

    if (!userToDelete) {
      throw new HttpException(
        'User with provided id does not exist',
        HttpStatus.NOT_FOUND,
      );
    }

    this.userRepository.delete(id);
  }

}
