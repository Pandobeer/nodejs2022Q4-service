import { CreateArtistDto } from '../dto/create-artist.dto';
import { UpdateArtistDto } from '../dto/update-artist.dto';
import { ArtistEntity } from '../entities/artist.entity';

export interface ArtistsStore {
  getAll: () => ArtistEntity[];
  create: (params: CreateArtistDto) => ArtistEntity;
  update: (id: string, artist: UpdateArtistDto) => ArtistEntity;
  findById: (id: string) => ArtistEntity | undefined;
  delete: (id: string) => void;
}
