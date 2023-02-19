import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, ManyToMany, JoinTable } from 'typeorm';
import { Column } from 'typeorm/decorator/columns/Column';
import { AlbumEntity, ArtistEntity, FavoriteEntity } from 'src/typeorm';
import { Exclude } from 'class-transformer';

@Entity()
export class TrackEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ format: 'uuid' })
  id: string;

  @ApiProperty({ example: 'Hey Ho' })
  @Column({ nullable: false })
  name: string;

  @ApiProperty({ format: 'uuid', example: null })
  @Column({ nullable: true })
  artistId: string | null;

  @ManyToOne(() => ArtistEntity, (artist) => artist.tracks, {
    onDelete: 'SET NULL',
    // createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'artistId' })
  artist: ArtistEntity;

  @ApiProperty({ format: 'uuid', example: null })
  @Column({ nullable: true })
  albumId: string | null;

  @ManyToOne(() => AlbumEntity, (album) => album.tracks, {
    onDelete: 'SET NULL',
    // createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'albumId' })
  album: AlbumEntity;

  @ApiProperty({ example: 262 })
  @Column({ nullable: false })
  duration: number;

  // @ManyToMany(() => FavoriteEntity, (favorite) => favorite.tracks, {
  // @ManyToMany(() => FavoriteEntity, (favorite) => favorite.tracks, {
  //   eager: true,
  //   cascade: true,
  //   onDelete: 'CASCADE'
  //   // orphanedRowAction: "delete"
  // })
  // // @JoinTable()
  // @Exclude()
  // favorites: FavoriteEntity[];

  constructor(entity: Partial<TrackEntity>) {
    Object.assign(this, entity);
  }
}
