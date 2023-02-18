import { AlbumEntity } from "src/albums/entities/album.entity";
import { ArtistEntity } from "src/artists/entities/artist.entity";
// import { FavoritesResponseEntity } from "src/favorites/entities/favorites-response.entity";
import { TrackEntity } from "src/tracks/entities/track.entity";
import { UserEntity } from "src/users/entities/user.entity";
import { FavoriteEntity } from './../favorites/entities/favorite.entity';

const entities = [UserEntity, ArtistEntity, AlbumEntity, TrackEntity, FavoriteEntity];

export { UserEntity, ArtistEntity, AlbumEntity, TrackEntity, FavoriteEntity };
export default entities;