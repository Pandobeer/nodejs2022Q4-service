import { forwardRef, Module } from '@nestjs/common';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';
// import InMemoryTracksStorage from '../store/tracks.storage';
import { ArtistModule } from 'src/artists/artist/artist.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrackEntity } from 'src/typeorm';

@Module({
  imports: [
    forwardRef(() => ArtistModule),
    TypeOrmModule.forFeature([TrackEntity]),
  ],
  controllers: [TrackController],
  providers: [TrackService],
  exports: [TrackService],
})
export class TrackModule { }
