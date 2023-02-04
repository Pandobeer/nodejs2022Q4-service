import { CreateTrackDto } from '../dto/create-track.dto';
import { UpdateTrackDto } from '../dto/update-track.dto';
import { TrackEntity } from '../entities/track.entity';

export interface TracksStore {
    getAll: () => TrackEntity[];
    create: (params: CreateTrackDto) => Promise<TrackEntity>;
    update: (id: string, track: UpdateTrackDto) => Promise<TrackEntity>;
    findById: (id: string) => TrackEntity | undefined;
    delete: (id: string) => void;
}