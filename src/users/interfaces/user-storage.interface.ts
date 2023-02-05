import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserEntity } from '../entities/user.entity';

export interface UsersStore {
  getAll: () => UserEntity[];
  create: (params: CreateUserDto) => Promise<UserEntity>;
  update: (id: string, user: UpdateUserDto) => Promise<UserEntity>;
  findById: (id: string) => UserEntity | undefined;
  delete: (id: string) => void;
}
