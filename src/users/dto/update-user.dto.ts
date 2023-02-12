import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ example: '12345' })
  @IsString()
  oldPassword: string;

  @ApiProperty({ example: '678' })
  @IsString()
  newPassword: string;
}
