import { AlbumEntity } from 'src/albums/entities/album.entity';
import { ArtistEntity } from 'src/artists/entities/artist.entity';
import { TrackEntity } from 'src/tracks/entities/track.entity';
import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { Entity } from 'typeorm';

@Entity()
export class FavoritesResponseEntity {
  @ApiProperty({ type: ArtistEntity, isArray: true })
  artists: ArtistEntity[];

  @ApiProperty({ type: AlbumEntity, isArray: true })
  albums: AlbumEntity[];

  @ApiProperty({ type: TrackEntity, isArray: true })
  tracks: TrackEntity[];

  constructor(entity: FavoritesResponseEntity) {
    Object.assign(this, entity);
  }
}
