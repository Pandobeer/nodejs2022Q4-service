import { Injectable, Param } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
// import { UsersStore } from './../interfaces/user-storage.interface';
import InMemoryUsersStorage from './../store/users.storage';

@Injectable()
export class UserService {
    constructor(private usersStore: InMemoryUsersStorage) { }
    // private readonly users: User[] = [];

    create(createUserDto: CreateUserDto) {
        return this.usersStore.create(createUserDto);
    }

    findAll() {
        return `this users`;
    }

    findOne(id: string) {
        return this.usersStore.findById(id);
    }

    update(updateUserDto: UpdateUserDto) {
        return this.usersStore.update(updateUserDto);
    }

    remove(id: string) {
        return this.usersStore.delete(id);
    }

    getSuggestedUsers(options: { limit: number, login: string; }) {
        return this.usersStore.getSuggestedUsers(options.limit, options.login);
    }

    delete(id: string): void {
        this.usersStore.delete(id);
    }

    // timestamp: new Date().toISOString()

    // findAll(): User[] {
    //     return this.users;
    // }
}