import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserEntity } from '../entities/user.entity';
import { UsersStore } from './../interfaces/user-storage.interface';

@Injectable()
class InMemoryUsersStorage implements UsersStore {
  private users: UserEntity[] = [];

  getAll() {
    return this.users;
  }

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const createdAt = Date.now();
    const updatedAt = createdAt;

    const newUser = {
      ...createUserDto,
      login: createUserDto.login,
      id: uuidv4(),
      version: 1,
      createdAt,
      updatedAt,
    };
    this.users.push(newUser);

    return newUser;
  }

  findById(id: string): UserEntity | undefined {
    const user = this.users.find((user) => user.id === id);
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    const userToUpdate = this.users.find((user) => user.id === id);
    const indexOfUserToUpdate = this.users.indexOf(userToUpdate);
    const newPassword = updateUserDto.newPassword;

    const updatedUser = {
      ...userToUpdate,
      password: newPassword,
      version: userToUpdate.version + 1,
      createdAt: userToUpdate.createdAt,
      updatedAt: Date.now(),
    };

    this.users.splice(indexOfUserToUpdate, 1, updatedUser);

    return updatedUser;
  }

  delete(id: string): void {
    const indexOfUserToDelete = this.users.findIndex((user) => user.id === id);

    this.users.splice(indexOfUserToDelete, 1);
  }
}

export default InMemoryUsersStorage;
