import { CreateUserDto } from './create-user.dto';
import { IsInt, IsString, IsUUID } from 'class-validator';

export class UserDto extends CreateUserDto {
  @IsUUID()
  readonly id: string;

  @IsString()
  readonly login: string;

  @IsString()
  readonly password: string;

  @IsInt()
  readonly version: number;

  @IsInt()
  readonly createdAt: number;

  @IsInt()
  readonly updatedAt: number;
}
