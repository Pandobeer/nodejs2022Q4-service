import { Injectable, Inject } from '@nestjs/common';
import { ArtistService } from 'src/artists/artist/artist.service';
import { v4 as uuidv4 } from "uuid";
import { CreateAlbumDto } from '../dto/create-album.dto';
import { UpdateAlbumDto } from '../dto/update-album.dto';
import { AlbumEntity } from '../entities/album.entity';
import { AlbumsStore } from './../interfaces/albums-storage.interface';

@Injectable()
class InMemoryAlbumsStorage implements AlbumsStore {
    private albums: AlbumEntity[] = [];

    constructor() { }
    // @Inject(ArtistService)
    // private readonly artistsService: ArtistService;

    getAll() {
        return this.albums;
    }

    async create(createAlbumDto: CreateAlbumDto): Promise<AlbumEntity> {
        const artistId = createAlbumDto.artistId || null;

        const newAlbum = {
            ...createAlbumDto,
            artistId,
            id: uuidv4(),
        };
        this.albums.push(newAlbum);

        return newAlbum;
    }

    findById(id: string): AlbumEntity | undefined {
        const album = this.albums.find(album => album.id === id);
        return album;
    };

    async update(id: string, updateAlbumDto: UpdateAlbumDto): Promise<AlbumEntity> {
        const albumToUpdate = this.albums.find((album) => album.id === id);
        const indexOfAlbumToUpdate = this.albums.indexOf(albumToUpdate);

        const updatedAlbum = {
            ...albumToUpdate,
            ...updateAlbumDto
        };

        this.albums.splice(indexOfAlbumToUpdate, 1, updatedAlbum);

        return updatedAlbum;
    }

    delete(id: string): void {
        const indexOfAlbumToDelete = this.albums.findIndex((album) => album.id === id);

        this.albums.splice(indexOfAlbumToDelete, 1);
    };

    updateArtistIdsInAlbums(artistId: string) {
        this.albums = this.albums.map((album) => {
            if (album.artistId === artistId) {
                return {
                    ...album,
                    artistId: null
                };
            }
            return album;
        });
    }

    // updateAlbumIds(albumId: string) {
    //     this.albums = this.albums.map((album) => {
    //         if (album.id === albumId) {
    //             return {
    //                 ...album,
    //                 albumId: null
    //             };
    //         }
    //         return album;
    //     });
    // }
}

export default InMemoryAlbumsStorage;