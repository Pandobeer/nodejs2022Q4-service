import { forwardRef, Module } from '@nestjs/common';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';
import InMemoryTracksStorage from '../store/tracks.storage';
import { ArtistModule } from 'src/artists/artist/artist.module';

@Module({
  imports: [forwardRef(() => ArtistModule)],
  controllers: [TrackController],
  providers: [TrackService, InMemoryTracksStorage],
  exports: [TrackService]
})
export class TrackModule { }
