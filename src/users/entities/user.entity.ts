import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger/dist/decorators';

export class UserEntity {
  @ApiProperty({ format: 'uuid' })
  id: string;

  @ApiProperty({ example: 'Stromae' })
  login: string;

  @Exclude()
  password: string;

  @ApiProperty({ example: 1 })
  version: number;

  @ApiProperty({ example: 1234567 })
  createdAt: number;

  @ApiProperty({ example: 1234567 })
  updatedAt: number;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
