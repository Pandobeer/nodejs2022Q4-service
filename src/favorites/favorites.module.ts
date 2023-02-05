import { Module, forwardRef } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import InMemoryFavoritesStorage from './store/favorites.storage';
import { ArtistModule } from 'src/artists/artist/artist.module';
import { TrackModule } from 'src/tracks/track/track.module';
import { AlbumsModule } from 'src/albums/albums.module';

@Module({
  imports: [
    forwardRef(() => ArtistModule),
    forwardRef(() => TrackModule),
    forwardRef(() => AlbumsModule),
  ],
  controllers: [FavoritesController],
  providers: [FavoritesService, InMemoryFavoritesStorage],
})
export class FavoritesModule {}
