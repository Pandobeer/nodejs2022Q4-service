import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from "uuid";
import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";
import { UserEntity } from "../entities/user.entity";
import { UsersStore } from './../interfaces/user-storage.interface';

@Injectable()
class InMemoryUsersStorage implements UsersStore {
    private users: UserEntity[] = [];

    constructor() { }

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
        const user = this.users.find(user => user.id === id);
        return user;
    };

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
        const userToDelete = this.users.find((user) => user.id === id);
        const indexOfUserToDelete = this.users.indexOf(userToDelete);

        this.users.splice(indexOfUserToDelete, 1);
    };

    // getSuggestedUsers(limit: number, login: string): UserEntity[] {
    //     return this.sortedUsersByLogin()
    //         .filter(user => user.login.includes(login) && this.isNotDeleted(user))
    //         .slice(0, limit);
    // };

    // private sortedUsersByLogin(): UserEntity[] {
    //     return this.users.sort((userA: UserEntity, userB: UserEntity): number => {
    //         if (userA.login < userB.login) return -1;
    //         if (userA.login > userB.login) return 1;

    //         return 0;
    //     });
    // }

    // private isNotDeleted(user: UserDto): boolean {
    //     return !user.isDeleted;
    // }
}

export default InMemoryUsersStorage;