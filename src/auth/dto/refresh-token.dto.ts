import { IsString, IsInt, ValidateIf, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger/dist/decorators';

export class RefreshTokenDto {

    @ApiProperty({ example: '123' })
    @IsString()
    // @IsNotEmpty()
    // @ValidateIf((_object, value) => value !== null)
    refreshToken: string;
}