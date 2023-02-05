import { Injectable, Inject } from '@nestjs/common';
// import { ArtistService } from 'src/artists/artist/artist.service';
// import { TrackEntity } from 'src/tracks/entities/track.entity';
// import { TrackService } from 'src/tracks/track/track.service';
// import { v4 as uuidv4 } from "uuid";
// import { CreateAlbumDto } from '../dto/create-album.dto';
// import { UpdateAlbumDto } from '../dto/update-album.dto';
// import { AlbumEntity } from '../entities/album.entity';
import { FavoriteEntity } from '../entities/favorite.entity';
// import { FavoritesResponseEntity } from '../entities/favorites-response.entity';
import { FavoritesStore } from './../interfaces/favorites-storage.interface';

@Injectable()
class InMemoryFavoritesStorage implements FavoritesStore {
    // private favoritesResponse: FavoritesResponseEntity[] = [];
    private favorites = new FavoriteEntity();

    constructor() { }
    // @Inject(ArtistService)
    // private readonly artistsService: ArtistService;

    // @Inject(TrackService)
    // private readonly trackService: TrackService;

    getAll() {
        return this.favorites;
    }

    createFavTrack(trackId: string) {
        this.favorites.tracks.push(trackId);
    }

    createFavAlbum(albumId: string) {
        this.favorites.albums.push(albumId);
    }

    createFavArtist(artistId: string) {
        this.favorites.artists.push(artistId);
    }

    findTrackById(id: string): string | undefined {
        const fatTrackId = this.favorites.tracks.find(trackId => trackId === id);
        return fatTrackId;
    };

    deleteTrack(id: string): void {
        const index = this.favorites.tracks.findIndex((trackId) => trackId === id);
        this.favorites.tracks.splice(index, 1);
    };

    findAlbumById(id: string): string | undefined {
        const favAlbumId = this.favorites.albums.find(albumId => albumId === id);
        return favAlbumId;
    };

    deleteAlbum(id: string): void {
        const index = this.favorites.albums.findIndex((albumId) => albumId === id);
        this.favorites.albums.splice(index, 1);
    };

    findArtistById(id: string): string | undefined {
        const favArtistId = this.favorites.artists.find(artistId => artistId === id);
        return favArtistId;
    };

    deleteArtist(id: string): void {
        const index = this.favorites.artists.findIndex((artistId) => artistId === id);
        this.favorites.artists.splice(index, 1);
    };

}

export default InMemoryFavoritesStorage;