import { Injectable } from '@nestjs/common';
import InMemoryArtistsStorage from './store/artists.storage';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Injectable()
export class ArtistService {
  constructor(private artistsStore: InMemoryArtistsStorage) {}

  create(createArtistDto: CreateArtistDto) {
    return this.artistsStore.create(createArtistDto);
  }

  getAllArtists() {
    return this.artistsStore.getAll();
  }

  findOne(id: string) {
    return this.artistsStore.findById(id);
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    return this.artistsStore.update(id, updateArtistDto);
  }

  remove(id: string) {
    return this.artistsStore.delete(id);
  }

  delete(id: string): void {
    this.artistsStore.delete(id);
  }
}
