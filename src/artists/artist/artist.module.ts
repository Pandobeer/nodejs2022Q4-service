import { forwardRef, Module } from '@nestjs/common';
import { AlbumsModule } from 'src/albums/album/albums.module';
import { TrackModule } from 'src/tracks/track/track.module';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';
import InMemoryArtistsStorage from '../store/artists.storage';

@Module({
  imports: [forwardRef(() => TrackModule), forwardRef(() => AlbumsModule)],
  controllers: [ArtistController],
  providers: [ArtistService, InMemoryArtistsStorage],
  exports: [ArtistService],
})
export class ArtistModule {}
