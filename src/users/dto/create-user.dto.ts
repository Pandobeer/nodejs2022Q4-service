import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'Mik' })
  @IsString()
  login: string;

  @ApiProperty({ example: '12345' })
  @IsString()
  password: string;
}
