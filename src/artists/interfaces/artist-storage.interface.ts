import { CreateArtistDto } from '../artist/dto/create-artist.dto';
import { UpdateArtistDto } from '../artist/dto/update-artist.dto';
import { ArtistEntity } from '../entities/artist.entity';

export interface ArtistsStore {
  getAll: () => ArtistEntity[];
  create: (params: CreateArtistDto) => Promise<ArtistEntity>;
  update: (id: string, artist: UpdateArtistDto) => Promise<ArtistEntity>;
  findById: (id: string) => ArtistEntity | undefined;
  delete: (id: string) => void;
}
