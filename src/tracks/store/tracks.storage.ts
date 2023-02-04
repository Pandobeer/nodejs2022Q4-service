import { Injectable, Inject } from '@nestjs/common';
import { ArtistService } from 'src/artists/artist/artist.service';
import { v4 as uuidv4 } from "uuid";
import { CreateTrackDto } from '../dto/create-track.dto';
import { UpdateTrackDto } from '../dto/update-track.dto';
import { TrackEntity } from '../entities/track.entity';
import { TracksStore } from '../interfaces/tracks-storage.interface';

@Injectable()
class InMemoryTracksStorage implements TracksStore {
    private tracks: TrackEntity[] = [];

    constructor() { }
    @Inject(ArtistService)
    private readonly artistsService: ArtistService;

    getAll() {
        return this.tracks;
    }

    async create(createTrackDto: CreateTrackDto): Promise<TrackEntity> {
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
        const track = this.tracks.find(track => track.id === id);
        return track;
    };

    async update(id: string, updateTrackDto: UpdateTrackDto): Promise<TrackEntity> {
        const trackToUpdate = this.tracks.find((track) => track.id === id);
        const indexOfTrackToUpdate = this.tracks.indexOf(trackToUpdate);

        const updatedTrack = {
            ...trackToUpdate,
            ...updateTrackDto
        };

        this.tracks.splice(indexOfTrackToUpdate, 1, updatedTrack);

        return updatedTrack;
    }

    delete(id: string): void {
        const trackToDelete = this.tracks.find((track) => track.id === id);
        const indexOfArtistToDelete = this.tracks.indexOf(trackToDelete);

        this.tracks.splice(indexOfArtistToDelete, 1);
    };

    updateArtistIdsInTracks(artistId: string) {
        this.tracks = this.tracks.map((track) => {
            if (track.artistId === artistId) {
                return {
                    ...track,
                    artistId: null
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
                    albumId: null
                };
            }
            return track;
        });
    }
}

export default InMemoryTracksStorage;