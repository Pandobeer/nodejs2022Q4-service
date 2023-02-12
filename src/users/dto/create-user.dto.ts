import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'Mik' })
  // @IsNotEmpty()
  @IsString()
  login: string;

  @ApiProperty({ example: '12345' })
  // @IsNotEmpty()
  @IsString()
  password: string;
}
