import { forwardRef, Module } from '@nestjs/common';
import { AlbumsModule } from 'src/albums/album/albums.module';
import { TrackModule } from 'src/tracks/track/track.module';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistEntity } from 'src/typeorm';

@Module({
  imports: [
    forwardRef(() => TrackModule),
    forwardRef(() => AlbumsModule),
    TypeOrmModule.forFeature([ArtistEntity]),
  ],
  controllers: [ArtistController],
  providers: [ArtistService],
  exports: [ArtistService],
})
export class ArtistModule { }
