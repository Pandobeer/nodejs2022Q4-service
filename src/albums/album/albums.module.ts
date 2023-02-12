import { Module, forwardRef } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { ArtistModule } from 'src/artists/artist/artist.module';
import { TrackModule } from 'src/tracks/track/track.module';
import InMemoryAlbumsStorage from '../store/albums.storage';

@Module({
  imports: [forwardRef(() => ArtistModule), forwardRef(() => TrackModule)],
  controllers: [AlbumsController],
  providers: [AlbumsService, InMemoryAlbumsStorage],
  exports: [AlbumsService],
})
export class AlbumsModule {}
