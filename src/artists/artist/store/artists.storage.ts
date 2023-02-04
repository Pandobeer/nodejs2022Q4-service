import { Injectable } from '@nestjs/common';
import { ArtistEntity } from 'src/artists/entities/artist.entity';
import { v4 as uuidv4 } from "uuid";
import { CreateArtistDto } from '../dto/create-artist.dto';
import { UpdateArtistDto } from '../dto/update-artist.dto';
import { ArtistsStore } from './../../interfaces/artist-storage.interface';

@Injectable()
class InMemoryArtistsStorage implements ArtistsStore {
    private artists: ArtistEntity[] = [];

    constructor() { }

    getAll() {
        return this.artists;
    }

    async create(createArtistDto: CreateArtistDto): Promise<ArtistEntity> {

        const newArtist = {
            ...createArtistDto,
            id: uuidv4(),
        } as ArtistEntity;
        this.artists.push(newArtist);

        return newArtist;
    }

    findById(id: string): ArtistEntity | undefined {
        const artist = this.artists.find(artist => artist.id === id);
        return artist;
    };

    async update(id: string, updateArtistDto: UpdateArtistDto): Promise<ArtistEntity> {
        const artistToUpdate = this.artists.find((artist) => artist.id === id);
        const indexOfArtistToUpdate = this.artists.indexOf(artistToUpdate);

        const updatedArtist = {
            ...artistToUpdate,
            ...updateArtistDto
        } as ArtistEntity;

        this.artists.splice(indexOfArtistToUpdate, 1, updatedArtist);

        return updatedArtist;
    }

    delete(id: string): void {
        const artistToDelete = this.artists.find((artist) => artist.id === id);
        const indexOfArtistToDelete = this.artists.indexOf(artistToDelete);

        this.artists.splice(indexOfArtistToDelete, 1);
    };
}

export default InMemoryArtistsStorage;