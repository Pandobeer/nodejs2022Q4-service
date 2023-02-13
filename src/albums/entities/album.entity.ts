import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { ManyToOne, PrimaryGeneratedColumn, JoinColumn, Entity } from 'typeorm';
import { Column } from 'typeorm/decorator/columns/Column';
import { ArtistEntity } from 'src/typeorm';

@Entity()
export class AlbumEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ format: 'uuid' })
  id: string;

  @ApiProperty({ example: 'The Best' })
  @Column({ nullable: false })
  name: string;

  @ApiProperty({ example: 2020 })
  @Column({ nullable: false })
  year: number;

  @ApiProperty({ format: 'uuid', example: null })
  @Column({ nullable: true })
  artistId: string | null;

  @ManyToOne(() => ArtistEntity, (artist) => artist.albums, {
    onDelete: 'SET NULL'
  })
  @JoinColumn({ name: 'artistId' })
  artist: ArtistEntity;

  constructor(entity: AlbumEntity) {
    Object.assign(this, entity);
  }
}
