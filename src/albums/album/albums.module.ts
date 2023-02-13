import { Module, forwardRef } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { ArtistModule } from 'src/artists/artist/artist.module';
import { TrackModule } from 'src/tracks/track/track.module';
// import InMemoryAlbumsStorage from '../store/albums.storage';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumEntity } from 'src/typeorm';

@Module({
  imports: [
    forwardRef(() => ArtistModule),
    forwardRef(() => TrackModule),
    TypeOrmModule.forFeature([AlbumEntity]),
  ],
  controllers: [AlbumsController],
  providers: [AlbumsService],
  exports: [AlbumsService],
})
export class AlbumsModule { }
