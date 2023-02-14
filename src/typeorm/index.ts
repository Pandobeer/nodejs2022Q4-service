import { AlbumEntity } from "src/albums/entities/album.entity";
import { ArtistEntity } from "src/artists/entities/artist.entity";
import { TrackEntity } from "src/tracks/entities/track.entity";
import { UserEntity } from "src/users/entities/user.entity";

const entities = [UserEntity, ArtistEntity, AlbumEntity, TrackEntity];

export { UserEntity, ArtistEntity, AlbumEntity, TrackEntity, };
export default entities;