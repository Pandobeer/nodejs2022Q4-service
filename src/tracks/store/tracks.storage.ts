import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateTrackDto } from '../dto/create-track.dto';
import { UpdateTrackDto } from '../dto/update-track.dto';
import { TrackEntity } from '../entities/track.entity';
import { TracksStore } from '../interfaces/tracks-storage.interface';

@Injectable()
class InMemoryTracksStorage implements TracksStore {
  private tracks: TrackEntity[] = [];

  getAll() {
    return this.tracks;
  }

  create(createTrackDto: CreateTrackDto): TrackEntity {
    const albumId = createTrackDto.albumId || null;
    const artistId = createTrackDto.artistId || null;

    const newTrack = {
      ...createTrackDto,
      albumId,
      artistId,
      id: uuidv4(),
    };
    this.tracks.push(newTrack);

    return newTrack;
  }

  findById(id: string): TrackEntity | undefined {
    const track = this.tracks.find((track) => track.id === id);
    return track;
  }

  update(id: string, updateTrackDto: UpdateTrackDto): TrackEntity {
    const trackToUpdate = this.tracks.find((track) => track.id === id);
    const indexOfTrackToUpdate = this.tracks.indexOf(trackToUpdate);

    const updatedTrack = {
      ...trackToUpdate,
      ...updateTrackDto,
    };

    this.tracks.splice(indexOfTrackToUpdate, 1, updatedTrack);

    return updatedTrack;
  }

  delete(id: string): void {
    const indexOfArtistToDelete = this.tracks.findIndex(
      (track) => track.id === id,
    );

    this.tracks.splice(indexOfArtistToDelete, 1);
  }

  updateArtistIdsInTracks(artistId: string) {
    this.tracks = this.tracks.map((track) => {
      if (track.artistId === artistId) {
        return {
          ...track,
          artistId: null,
        };
      }
      return track;
    });
  }

  updateAlbumIds(albumId: string) {
    this.tracks = this.tracks.map((track) => {
      if (track.albumId === albumId) {
        return {
          ...track,
          albumId: null,
        };
      }
      return track;
    });
  }
}

export default InMemoryTracksStorage;
