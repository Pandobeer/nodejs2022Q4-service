import { CreateArtistDto } from '../dto/create-artist.dto';
import { UpdateArtistDto } from '../dto/update-artist.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ArtistEntity } from 'src/typeorm';
import { Repository } from 'typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(ArtistEntity) private readonly artistRepository: Repository<ArtistEntity>
  ) { }

  async create(createArtistDto: CreateArtistDto) {
    const newArtist = this.artistRepository.create({
      ...createArtistDto,
    });

    await this.artistRepository.save(newArtist);

    return newArtist;
  }

  async getAllArtists() {
    const artists = await this.artistRepository.find();

    return artists;
  }

  async findOne(id: string) {
    const artist = await this.artistRepository.findOneBy({ id });

    if (!artist) {
      throw new HttpException(
        `User with provided id does not exist`,
        HttpStatus.NOT_FOUND,
      );
    }

    return artist;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    const artistToUpdate = await this.findOne(id);

    Object.assign(artistToUpdate, updateArtistDto);

    await this.artistRepository.save(artistToUpdate);

    return artistToUpdate;
  }

  async delete(id: string) {
    const artistToDelete = await this.artistRepository.findOneBy({ id });

    if (!artistToDelete) {
      throw new HttpException(
        'Artist with provided id does not exist',
        HttpStatus.NOT_FOUND,
      );
    }

    return this.artistRepository.delete(id);
  }
}
