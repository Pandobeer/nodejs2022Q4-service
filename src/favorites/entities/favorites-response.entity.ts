import { AlbumEntity } from "src/albums/entities/album.entity";
import { ArtistEntity } from "src/artists/entities/artist.entity";
import { TrackEntity } from "src/tracks/entities/track.entity";

export class FavoritesResponseEntity {
    artists: ArtistEntity[];
    albums: AlbumEntity[];
    tracks: TrackEntity[];
}