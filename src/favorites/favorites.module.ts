import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
// import InMemoryFavoritesStorage from './store/favorites.storage';
// import { ArtistModule } from 'src/artists/artist/artist.module';
// import { TrackModule } from 'src/tracks/track/track.module';
// import { AlbumsModule } from 'src/albums/album/albums.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoriteEntity, TrackEntity, AlbumEntity, ArtistEntity } from 'src/typeorm';

@Module({
  imports: [
    // forwardRef(() => ArtistModule),
    // forwardRef(() => TrackModule),
    // forwardRef(() => AlbumsModule),
    TypeOrmModule.forFeature([FavoriteEntity, TrackEntity, AlbumEntity, ArtistEntity]),
  ],
  controllers: [FavoritesController],
  providers: [FavoritesService],
})
export class FavoritesModule { }
