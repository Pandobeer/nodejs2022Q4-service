import { IsString, IsInt, ValidateIf, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger/dist/decorators';

export class RefreshTokenDto {
    @ApiProperty({ example: 'Mik' })
    @IsString()
    @IsNotEmpty()
    login: string;

    @ApiProperty({ format: 'uuid', example: null })
    @IsString()
    @ValidateIf((_object, value) => value !== null)
    userId: string | null;

    @ApiProperty({ example: 'RefreshToken' })
    @IsString()
    refreshToken: string;
}