import { AlbumEntity } from '../albums/entities/album.entity';
import { ArtistEntity } from '../artists/entities/artist.entity';
import { FavoriteEntity } from '../favorites/entities/favorite.entity';
import { TrackEntity } from '../tracks/entities/track.entity';
import { UserEntity } from '../users/entities/user.entity';

const entities = [
  UserEntity,
  ArtistEntity,
  AlbumEntity,
  TrackEntity,
  FavoriteEntity,
];

export { UserEntity, ArtistEntity, AlbumEntity, TrackEntity, FavoriteEntity };
export default entities;
