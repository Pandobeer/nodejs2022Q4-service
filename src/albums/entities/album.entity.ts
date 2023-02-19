import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { ManyToOne, PrimaryGeneratedColumn, JoinColumn, Entity, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { Column } from 'typeorm/decorator/columns/Column';
import { ArtistEntity, TrackEntity, FavoriteEntity } from 'src/typeorm';
import { Exclude } from 'class-transformer';

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
    onDelete: 'SET NULL',
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'artistId' })
  artist: ArtistEntity;

  @OneToMany(() => TrackEntity, (track) => track.albumId, {
  })
  tracks: TrackEntity[];

  // @ManyToMany(() => FavoriteEntity, favorite => favorite.albums)
  // favorites: FavoriteEntity[];

  // @ManyToMany(() => FavoriteEntity, (favorite) => favorite.albums, {
  //   eager: true,
  //   cascade: true,
  //   onDelete: 'CASCADE'
  //   // orphanedRowAction: "delete"
  // })
  // @JoinTable()
  // @Exclude()
  // favorites: FavoriteEntity[];

  constructor(entity: Partial<AlbumEntity>) {
    Object.assign(this, entity);
  }
}
