import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAlbumDto } from '../dto/create-album.dto';
import { UpdateAlbumDto } from '../dto/update-album.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AlbumEntity } from 'src/typeorm';
import { Repository } from 'typeorm';


@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(AlbumEntity) private readonly albumRepository: Repository<AlbumEntity>
  ) { }

  async create(createAlbumDto: CreateAlbumDto) {
    const newAlbum = this.albumRepository.create({
      ...createAlbumDto,
    });

    await this.albumRepository.save(newAlbum);

    return newAlbum;
  }

  async getAllAlbums() {
    const albums = await this.albumRepository.find();

    return albums;
  }

  async findOne(id: string) {
    const album = await this.albumRepository.findOneBy({ id });

    if (!album) {
      throw new HttpException(
        `Album with provided id does not exist`,
        HttpStatus.NOT_FOUND,
      );
    }

    return album;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const albumToUpdate = await this.albumRepository.findOneBy({ id });

    if (!albumToUpdate) {
      throw new HttpException(
        `Album with provided id does not exist`,
        HttpStatus.NOT_FOUND,
      );
    }

    const updatedAlbum = new AlbumEntity({
      ...albumToUpdate,
      ...updateAlbumDto,
    });

    await this.albumRepository.update(id, updatedAlbum);

    return updatedAlbum;
  }

  async delete(id: string) {
    const albumToDelete = await this.albumRepository.findOneBy({ id });

    if (!albumToDelete) {
      throw new HttpException(
        'Album with provided id does not exist',
        HttpStatus.NOT_FOUND,
      );
    }

    return this.albumRepository.delete(id);
  }
}
