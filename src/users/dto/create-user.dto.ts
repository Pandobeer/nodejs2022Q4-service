import { IsString } from 'class-validator';

export class CreateUserDto {

    @IsString()
    readonly login: string;

    @IsString()
    readonly password: string;

    // @IsString()
    // readonly id: string;


    // @IsInt()
    // readonly version: number;

    // @IsInt()
    // readonly createdAt: number;

    // @IsInt()
    // readonly updatedAt: number;

    // isDeleted: boolean;
}