import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger/dist/decorators';

export class RefreshTokenDto {
  @ApiProperty({ example: '123' })
  @IsString()
  refreshToken: string;
}
