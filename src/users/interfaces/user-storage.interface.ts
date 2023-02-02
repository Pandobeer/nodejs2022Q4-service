import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserEntity } from '../entities/user.entity';

export interface UsersStore {
    create: (params: CreateUserDto) => UserEntity;
    update: (user: UpdateUserDto) => UserEntity;
    findById: (id: string) => UserEntity | undefined;
    delete: (id: string) => void;
    getSuggestedUsers: (limit: number, login: string) => UserEntity[];
}