import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from '../dto/create-album.dto';
import { UpdateAlbumDto } from '../dto/update-album.dto';
import InMemoryAlbumsStorage from '../store/albums.storage';

@Injectable()
export class AlbumsService {
  constructor(private albumsStore: InMemoryAlbumsStorage) {}

  create(createAlbumDto: CreateAlbumDto) {
    return this.albumsStore.create(createAlbumDto);
  }

  findAll() {
    return this.albumsStore.getAll();
  }

  findOne(id: string) {
    return this.albumsStore.findById(id);
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    return this.albumsStore.update(id, updateAlbumDto);
  }

  remove(id: string) {
    this.albumsStore.delete(id);
  }

  updateArtistIdsInAlbums(artistId: string) {
    this.albumsStore.updateArtistIdsInAlbums(artistId);
  }
}
