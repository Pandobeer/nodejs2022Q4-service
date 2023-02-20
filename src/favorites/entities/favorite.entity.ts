import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TrackEntity, AlbumEntity, ArtistEntity } from '../../typeorm';

@Entity({ name: 'favorites' })
export class FavoriteEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column('text', { array: true, default: [] })
  artistsIds: string[];

  @Column('text', { array: true, default: [] })
  albumsIds: string[];

  @Column('text', { array: true, default: [] })
  tracksIds: string[];

  @ManyToMany(() => ArtistEntity, (artist) => artist.id, {
    onDelete: 'CASCADE',
  })
  @JoinTable()
  artists: ArtistEntity[];

  @ManyToMany(() => AlbumEntity, (album) => album.id, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinTable()
  albums: AlbumEntity[];

  @ManyToMany(() => TrackEntity, (track) => track.id, {
    onDelete: 'CASCADE',
  })
  @JoinTable()
  tracks: TrackEntity[];

  constructor(entity: Partial<FavoriteEntity>) {
    Object.assign(this, entity);
  }
}
