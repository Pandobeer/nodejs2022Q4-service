import { CreateAlbumDto } from '../dto/create-album.dto';
import { UpdateAlbumDto } from '../dto/update-album.dto';
import { AlbumEntity } from '../entities/album.entity';

export interface AlbumsStore {
  getAll: () => AlbumEntity[];
  create: (params: CreateAlbumDto) => Promise<AlbumEntity>;
  update: (id: string, album: UpdateAlbumDto) => Promise<AlbumEntity>;
  findById: (id: string) => AlbumEntity | undefined;
  delete: (id: string) => void;
}
