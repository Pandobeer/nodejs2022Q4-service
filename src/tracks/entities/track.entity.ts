import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Column } from 'typeorm/decorator/columns/Column';
import { AlbumEntity, ArtistEntity } from '../../typeorm';

@Entity({ name: 'tracks' })
export class TrackEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ format: 'uuid' })
  id: string;

  @ApiProperty({ example: 'Hey Ho' })
  @Column({ nullable: false })
  name: string;

  @ApiProperty({ format: 'uuid', example: null })
  @Column({ nullable: true, default: null })
  artistId: string | null;

  @ManyToOne(() => ArtistEntity, (artist) => artist.tracks, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'artistId' })
  artist: ArtistEntity;

  @ApiProperty({ format: 'uuid', example: null })
  @Column({ nullable: true, default: null })
  albumId: string | null;

  @ManyToOne(() => AlbumEntity, (album) => album.tracks, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'albumId' })
  album: AlbumEntity;

  @ApiProperty({ example: 262 })
  @Column({ nullable: false })
  duration: number;

  constructor(entity: Partial<TrackEntity>) {
    Object.assign(this, entity);
  }
}
