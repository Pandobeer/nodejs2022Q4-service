import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import {
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
  Entity,
  OneToMany,
} from 'typeorm';
import { Column } from 'typeorm/decorator/columns/Column';
import { ArtistEntity, TrackEntity } from '../../typeorm';

@Entity({ name: 'albums' })
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
  @Column({ nullable: true, default: null })
  artistId: string | null;

  @ManyToOne(() => ArtistEntity, (artist) => artist.albums, {
    onDelete: 'SET NULL',
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'artistId' })
  artist: ArtistEntity;

  @OneToMany(() => TrackEntity, (track) => track.albumId, {})
  tracks: TrackEntity[];

  constructor(entity: Partial<AlbumEntity>) {
    Object.assign(this, entity);
  }
}
