import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Column } from 'typeorm/decorator/columns/Column';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ format: 'uuid' })
  id: string;

  @ApiProperty({ example: 'Stromae' })
  @Column({ nullable: false })
  login: string;

  @Exclude()
  password: string;

  @ApiProperty({ example: 1 })
  @Column({ nullable: false, default: 1 })
  version: number;

  @ApiProperty({ example: 1655000000 })
  @Column({ nullable: false, type: 'bigint' })
  createdAt: number;

  @ApiProperty({ example: 1655000000 })
  @Column({ nullable: false, type: 'bigint' })
  updatedAt: number;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
