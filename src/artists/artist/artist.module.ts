import { Module } from '@nestjs/common';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';
import InMemoryArtistsStorage from './store/artists.storage';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService, InMemoryArtistsStorage]
})
export class ArtistModule { }
