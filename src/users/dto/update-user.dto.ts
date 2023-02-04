import { PartialType } from '@nestjs/mapped-types';
import { UserDto } from './user.dto';
import { IsString } from 'class-validator';

export class UpdateUserDto extends PartialType(UserDto) {
    @IsString()
    readonly oldPassword: string;

    @IsString()
    readonly newPassword: string;
}