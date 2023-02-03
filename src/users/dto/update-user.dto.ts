import { PartialType } from '@nestjs/mapped-types';
// import { CreateUserDto } from './create-user.dto';
import { UserDto } from './user.dto';

export class UpdateUserDto extends PartialType(UserDto) { }