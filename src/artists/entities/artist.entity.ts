import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { PrimaryGeneratedColumn, Entity, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { Column } from 'typeorm/decorator/columns/Column';
import { AlbumEntity, FavoriteEntity } from 'src/typeorm';
import { TrackEntity } from 'src/typeorm';
import { Exclude } from 'class-transformer';

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

  // @ManyToMany(() => FavoriteEntity, (favorite) => favorite.artists, {
  //   eager: true,
  //   cascade: true,
  //   onDelete: 'CASCADE'
  //   // orphanedRowAction: "delete"
  // })
  // @JoinTable()
  // @Exclude()
  // favorites: FavoriteEntity[];

  constructor(entity: Partial<ArtistEntity>) {
    Object.assign(this, entity);
  }
}
