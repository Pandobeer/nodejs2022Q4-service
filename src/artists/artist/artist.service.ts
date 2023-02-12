import { Injectable } from '@nestjs/common';
// import InMemoryArtistsStorage from '../store/artists.storage';
import { CreateArtistDto } from '../dto/create-artist.dto';
import { UpdateArtistDto } from '../dto/update-artist.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ArtistEntity } from 'src/typeorm';
import { Repository } from 'typeorm';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { HttpStatus } from '@nestjs/common/enums';

@Injectable()
export class ArtistService {
  constructor(
    // private artistsStore: InMemoryArtistsStorage
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
    console.log(artists);

    return artists;
  }

  async findOne(id: string) {
    // return this.artistRepository.findById(id);
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
    // return this.artistRepository.update(id, updateArtistDto);
    const artistToUpdate = await this.artistRepository.findOneBy({ id });

    if (!artistToUpdate) {
      throw new HttpException(
        `User with provided id does not exist`,
        HttpStatus.NOT_FOUND,
      );
    }

    const updatedArtist = new ArtistEntity({
      ...artistToUpdate,
      ...updateArtistDto,
    });

    await this.artistRepository.update(id, updatedArtist);

    return updatedArtist;
  }

  // remove(id: string) {
  //   return this.artistRepository.delete(id);
  // }

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
