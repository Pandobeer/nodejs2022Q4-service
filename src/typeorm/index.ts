import { AlbumEntity } from "src/albums/entities/album.entity";
import { ArtistEntity } from "src/artists/entities/artist.entity";
import { UserEntity } from "src/users/entities/user.entity";

const entities = [UserEntity, ArtistEntity, AlbumEntity];

export { UserEntity, ArtistEntity, AlbumEntity };
export default entities;