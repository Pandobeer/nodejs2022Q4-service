import { Injectable } from '@nestjs/common';
import InMemoryFavoritesStorage from './store/favorites.storage';

@Injectable()
export class FavoritesService {
  constructor(private favoritesStore: InMemoryFavoritesStorage) {}

  createFavTrack(trackId: string) {
    this.favoritesStore.createFavTrack(trackId);
  }

  createFavAlbum(albumId: string) {
    this.favoritesStore.createFavAlbum(albumId);
  }

  createFavArtist(artistId: string) {
    this.favoritesStore.createFavArtist(artistId);
  }

  getAll() {
    return this.favoritesStore.getAll();
  }

  findTrackById(trackId: string) {
    return this.favoritesStore.findTrackById(trackId);
  }

  deleteTrack(trackId: string) {
    this.favoritesStore.deleteTrack(trackId);
  }

  findAlbumById(albumId: string) {
    return this.favoritesStore.findAlbumById(albumId);
  }

  deleteAlbum(albumId: string): void {
    this.favoritesStore.deleteAlbum(albumId);
  }

  findArtistById(artistId: string) {
    return this.favoritesStore.findArtistById(artistId);
  }

  deleteArtist(artistId: string): void {
    this.favoritesStore.deleteArtist(artistId);
  }
}
