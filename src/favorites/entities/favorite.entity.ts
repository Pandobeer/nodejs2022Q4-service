import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TrackEntity, AlbumEntity } from 'src/typeorm';

@Entity()
export class FavoriteEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text", { array: true, default: [] })
  artistsIds: string[];

  // @ManyToMany(() => Artist, artist => artist.favorites)
  // @JoinTable()
  // artists: Artist[];

  @Column("text", { array: true, default: [] })
  albumsIds: string[];

  // @ManyToMany(() => AlbumEntity, album => album.favorites)
  // @JoinTable()
  // albums: AlbumEntity[];

  @Column("text", { array: true, default: [] })
  tracksIds: string[];

  // @OneToMany(() => TrackEntity, (track) => track.favorites)
  // @Column("text", { array: true, default: [] })
  // tracks: TrackEntity[];

  // @ManyToMany(() => TrackEntity, (track) => track.id, {
  //   // onDelete: 'SET NULL'
  // })
  // @JoinTable(
  //   // { inverseJoinColumn: { name: 'trackId' } }
  // )
  // tracks: TrackEntity[];

  constructor(
    // entity: Partial<FavoriteEntity>
  ) {
    //   // this.artists = [];
    //   // this.albums = [];
    //   // this.tracks = [];

    // Object.assign(this, entity);
  }
}
