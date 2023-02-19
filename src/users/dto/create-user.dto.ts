import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'Mik' })
  @IsString()
  @IsNotEmpty()
  login: string;

  @ApiProperty({ example: '12345' })
  @IsString()
  @IsNotEmpty()
  password: string;
}
