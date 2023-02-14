import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { PrimaryGeneratedColumn, Entity, OneToMany } from 'typeorm';
import { Column } from 'typeorm/decorator/columns/Column';
import { AlbumEntity } from 'src/typeorm';
import { TrackEntity } from 'src/typeorm';

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
  })
  albums: AlbumEntity[];

  @OneToMany(() => TrackEntity, (track) => track.artistId, {
  })
  tracks: TrackEntity[];

  constructor(entity: ArtistEntity) {
    Object.assign(this, entity);
  }
}
