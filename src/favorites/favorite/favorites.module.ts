import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  FavoriteEntity,
  TrackEntity,
  AlbumEntity,
  ArtistEntity,
} from 'src/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      FavoriteEntity,
      TrackEntity,
      AlbumEntity,
      ArtistEntity,
    ]),
  ],
  controllers: [FavoritesController],
  providers: [FavoritesService],
})
export class FavoritesModule {}
