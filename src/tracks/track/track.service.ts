import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from '../dto/create-track.dto';
import { UpdateTrackDto } from '../dto/update-track.dto';
import InMemoryTracksStorage from '../store/tracks.storage';

@Injectable()
export class TrackService {
  constructor(private trackStore: InMemoryTracksStorage) {}

  create(createTrackDto: CreateTrackDto) {
    return this.trackStore.create(createTrackDto);
  }

  getAllTracks() {
    return this.trackStore.getAll();
  }

  findOne(id: string) {
    return this.trackStore.findById(id);
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    return this.trackStore.update(id, updateTrackDto);
  }

  remove(id: string) {
    this.trackStore.delete(id);
  }

  delete(id: string): void {
    this.trackStore.delete(id);
  }

  updateArtistIdsInTracks(artistId: string) {
    this.trackStore.updateArtistIdsInTracks(artistId);
  }

  updateAlbumIds(albumId: string) {
    this.trackStore.updateAlbumIds(albumId);
  }
}
