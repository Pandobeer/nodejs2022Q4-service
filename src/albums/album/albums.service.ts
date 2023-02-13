import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAlbumDto } from '../dto/create-album.dto';
import { UpdateAlbumDto } from '../dto/update-album.dto';
// import InMemoryAlbumsStorage from '../store/albums.storage';
import { InjectRepository } from '@nestjs/typeorm';
import { AlbumEntity } from 'src/typeorm';
import { Repository } from 'typeorm';


@Injectable()
export class AlbumsService {
  constructor(
    // private albumsStore: InMemoryAlbumsStorage
    @InjectRepository(AlbumEntity) private readonly albumRepository: Repository<AlbumEntity>
  ) { }

  async create(createAlbumDto: CreateAlbumDto) {
    // const artistId = createAlbumDto.artistId || null;
    const newAlbum = this.albumRepository.create({
      ...createAlbumDto,
      // artistId,
    });

    await this.albumRepository.save(newAlbum);

    return newAlbum;
  }

  async getAllAlbums() {
    // return this.albumRepository.getAll();
    const albums = await this.albumRepository.find();

    return albums;
  }

  async findOne(id: string) {
    // return this.albumRepository.findById(id);
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
    // return this.albumRepository.update(id, updateAlbumDto);
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
    // this.albumRepository.delete(id);
    const albumToDelete = await this.albumRepository.findOneBy({ id });

    if (!albumToDelete) {
      throw new HttpException(
        'Artist with provided id does not exist',
        HttpStatus.NOT_FOUND,
      );
    }

    return this.albumRepository.delete(id);
  }

  // async updateArtistIdsInAlbums(artistId: string) {
  // const albumsToUpdate = this.albumRepository.findBy({artistId})  
  // this.albums = this.albums.map((album) => {
  //       if (album.artistId === artistId) {
  //         return {
  //           ...album,
  //           artistId: null,
  //         };
  //       }
  //       return album;
  //     });
  //   }
  // this.albumRepository.updateArtistIdsInAlbums(artistId);
  // }
}
