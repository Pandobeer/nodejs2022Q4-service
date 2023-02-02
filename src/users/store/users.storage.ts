import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from "uuid";
import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";
import { UserDto } from '../dto/user.dto';
import { UserEntity } from "../entities/user.entity";
import { UsersStore } from './../interfaces/user-storage.interface';

@Injectable()
class InMemoryUsersStorage implements UsersStore {
    private users: UserEntity[] = [];

    constructor() { }

    findById(id: string): UserEntity | undefined {
        return this.users.find(user => user.id === id
            && this.isNotDeleted(user)
        );
    };

    create(userDto: CreateUserDto): UserEntity {
        const newUser = {
            ...userDto,
            id: uuidv4(),
            isDeleted: false
        } as UserEntity;
        this.users.push(newUser);
        return newUser;
    }

    update(updateUserDto: UpdateUserDto): UserEntity {
        this.users = this.users.map(user => {
            if (user.id === updateUserDto.id) {
                return Object.assign(user, updateUserDto);
            }
            return user;
        });

        return this.findById(updateUserDto.id);
    };

    delete(id: string): void {
        this.users.filter(user => user.id === id);
    }

    getSuggestedUsers(limit: number, login: string): UserEntity[] {
        return this.sortedUsersByLogin()
            .filter(user => user.login.includes(login) && this.isNotDeleted(user))
            .slice(0, limit);
    };

    private sortedUsersByLogin(): UserEntity[] {
        return this.users.sort((userA: UserEntity, userB: UserEntity): number => {
            if (userA.login < userB.login) return -1;
            if (userA.login > userB.login) return 1;

            return 0;
        });
    }

    private isNotDeleted(user: UserDto): boolean {
        return !user.isDeleted;
    }

}

export default InMemoryUsersStorage;