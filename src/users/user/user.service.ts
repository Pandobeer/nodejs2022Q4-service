import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import InMemoryUsersStorage from './../store/users.storage';

@Injectable()
export class UserService {
  constructor(private usersStore: InMemoryUsersStorage) {}

  create(createUserDto: CreateUserDto) {
    return this.usersStore.create(createUserDto);
  }

  getAllUsers() {
    return this.usersStore.getAll();
  }

  findOne(id: string) {
    return this.usersStore.findById(id);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.usersStore.update(id, updateUserDto);
  }

  remove(id: string) {
    return this.usersStore.delete(id);
  }

  delete(id: string): void {
    this.usersStore.delete(id);
  }
}
