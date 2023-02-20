import { Exclude, Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ format: 'uuid' })
  id: string;

  @ApiProperty({ example: 'Stromae' })
  @Column({ nullable: false })
  login: string;

  @Exclude()
  @Column()
  password: string;

  @ApiProperty({ example: 1 })
  @VersionColumn()
  version: number;

  @ApiProperty({ example: 1655000000 })
  @CreateDateColumn()
  @Transform(({ value }) => new Date(value).getTime())
  createdAt: number;

  @ApiProperty({ example: 1655000000 })
  @UpdateDateColumn()
  @Transform(({ value }) => new Date(value).getTime())
  updatedAt: number;

  constructor(entity: Partial<UserEntity>) {
    Object.assign(this, entity);
  }
}
