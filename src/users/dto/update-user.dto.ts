import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ example: '12345' })
  @IsString()
  @IsNotEmpty()
  oldPassword: string;

  @ApiProperty({ example: '678' })
  @IsString()
  @IsNotEmpty()
  newPassword: string;
}
