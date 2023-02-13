import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { PrimaryGeneratedColumn, Entity, OneToMany } from 'typeorm';
import { Column } from 'typeorm/decorator/columns/Column';
import { AlbumEntity } from 'src/albums/entities/album.entity';

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

  @OneToMany(() => AlbumEntity, (album) => album.artistId, {
    // onDelete: 'SET NULL'
  })
  albums: AlbumEntity[];

  constructor(entity: ArtistEntity) {
    Object.assign(this, entity);
  }
}
