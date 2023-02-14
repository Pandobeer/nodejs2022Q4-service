import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateTrackDto } from '../dto/create-track.dto';
import { UpdateTrackDto } from '../dto/update-track.dto';
// import InMemoryTracksStorage from '../store/tracks.storage';
import { InjectRepository } from '@nestjs/typeorm';
import { TrackEntity } from 'src/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TrackService {
  constructor(
    // private trackRepository: InMemoryTracksStorage
    @InjectRepository(TrackEntity) private readonly trackRepository: Repository<TrackEntity>
  ) { }

  async create(createTrackDto: CreateTrackDto) {
    // return this.trackRepository.create(createTrackDto);
    const newTrack = this.trackRepository.create({
      ...createTrackDto,
    });

    await this.trackRepository.save(newTrack);

    return newTrack;
  }

  async getAllTracks() {
    // return this.trackRepository.getAll();
    const tracks = await this.trackRepository.find();

    return tracks;
  }

  async findOne(id: string) {
    // return this.trackRepository.findById(id);
    const track = await this.trackRepository.findOneBy({ id });

    if (!track) {
      throw new HttpException(
        `Track with provided id does not exist`,
        HttpStatus.NOT_FOUND,
      );
    }

    return track;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    // return this.trackRepository.update(id, updateTrackDto);
    const trackToUpdate = await this.trackRepository.findOneBy({ id });

    if (!trackToUpdate) {
      throw new HttpException(
        `Track with provided id does not exist`,
        HttpStatus.NOT_FOUND,
      );
    }

    const updatedTrack = new TrackEntity({
      ...trackToUpdate,
      ...updateTrackDto,
    });

    await this.trackRepository.update(id, updatedTrack);

    return updatedTrack;
  }

  // remove(id: string) {
  //   this.trackRepository.delete(id);
  // }

  async delete(id: string) {

    // this.trackRepository.delete(id);
    const trackToDelete = await this.trackRepository.findOneBy({ id });

    if (!trackToDelete) {
      throw new HttpException(
        'Track with provided id does not exist',
        HttpStatus.NOT_FOUND,
      );
    }

    return this.trackRepository.delete(id);
  }

  // updateArtistIdsInTracks(artistId: string) {
  //   this.trackRepository.updateArtistIdsInTracks(artistId);
  // }

  // updateAlbumIds(albumId: string) {
  //   this.trackRepository.updateAlbumIds(albumId);
  // }
}
