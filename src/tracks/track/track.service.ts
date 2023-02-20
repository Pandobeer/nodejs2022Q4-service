import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateTrackDto } from '../dto/create-track.dto';
import { UpdateTrackDto } from '../dto/update-track.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TrackEntity } from 'src/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(TrackEntity)
    private readonly trackRepository: Repository<TrackEntity>,
  ) {}

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
    const trackToUpdate = await this.findOne(id);

    return await this.trackRepository.save({
      ...trackToUpdate,
      ...updateTrackDto,
    });
  }

  async delete(id: string) {
    const trackToDelete = await this.findOne(id);

    return await this.trackRepository.delete(trackToDelete.id);
  }
}
