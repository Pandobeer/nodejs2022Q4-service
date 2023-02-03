import { CreateUserDto } from "./create-user.dto";
import { IsInt, IsString, isUUID } from 'class-validator';

export class UserDto extends CreateUserDto {
    // @isUUID()
    @IsString()
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