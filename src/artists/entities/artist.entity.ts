import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { PrimaryGeneratedColumn, Entity } from 'typeorm';
import { Column } from 'typeorm/decorator/columns/Column';

@Entity()
export class ArtistEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ format: 'uuid' })
  id: string;

  @ApiProperty({ example: 'Stromae' })
  @Column({ nullable: false })
  name: string;

  @ApiProperty({ example: false })
  @Column({ nullable: false })
  grammy: boolean;

  constructor(entity: ArtistEntity) {
    Object.assign(this, entity);
  }
}
