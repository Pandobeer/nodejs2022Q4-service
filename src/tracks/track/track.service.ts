import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateTrackDto } from '../dto/create-track.dto';
import { UpdateTrackDto } from '../dto/update-track.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TrackEntity } from 'src/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(TrackEntity) private readonly trackRepository: Repository<TrackEntity>
  ) { }

  async create(createTrackDto: CreateTrackDto) {

    const newTrack = this.trackRepository.create({
      ...createTrackDto,
    });

    await this.trackRepository.save(newTrack);

    return newTrack;
  }

  async getAllTracks() {
    const tracks = await this.trackRepository.find();

    return tracks;
  }

  async findOne(id: string) {
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

  async delete(id: string) {

    const trackToDelete = await this.trackRepository.findOneBy({ id });

    if (!trackToDelete) {
      throw new HttpException(
        'Track with provided id does not exist',
        HttpStatus.NOT_FOUND,
      );
    }

    return this.trackRepository.delete(id);
  }
}
