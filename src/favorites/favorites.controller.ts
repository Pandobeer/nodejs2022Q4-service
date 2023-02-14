import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  ParseUUIDPipe,
  Inject,
  HttpException,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { TrackService } from 'src/tracks/track/track.service';
import { AlbumsService } from 'src/albums/album/albums.service';
import { ArtistService } from 'src/artists/artist/artist.service';
import { FavoritesResponseEntity } from './entities/favorites-response.entity';
import { ApiResponse, ApiTags } from '@nestjs/swagger/dist';

@ApiTags('Favs')
@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) { }

  @Inject(TrackService)
  private readonly trackService: TrackService;

  @Inject(AlbumsService)
  private readonly albumsService: AlbumsService;

  @Inject(ArtistService)
  private readonly artistService: ArtistService;

  @Post('track/:id')
  createFavTrack(@Param('id', ParseUUIDPipe) id: string) {
    const favTrack = this.trackService.findOne(id);

    if (!favTrack) {
      throw new HttpException(
        `Track with provided id does not exist`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    this.favoritesService.createFavTrack(id);

    return `Track with id${id} was successfully added to favourite tracks`;
  }

  @Post('album/:id')
  createFavAlbum(@Param('id', ParseUUIDPipe) id: string) {
    const favAlbum = this.albumsService.findOne(id);

    if (!favAlbum) {
      throw new HttpException(
        `Album with provided id does not exist`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    this.favoritesService.createFavAlbum(id);

    return `Album with id${id} was successfully added to favourite albums`;
  }

  @Post('artist/:id')
  createFavArtist(@Param('id', ParseUUIDPipe) id: string) {
    const favArtist = this.artistService.findOne(id);

    if (!favArtist) {
      throw new HttpException(
        `Artist with provided id does not exist`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    this.favoritesService.createFavArtist(id);

    return `Artist with id${id} was successfully added to favourite artists`;
  }

  @Get()
  async getAll() {
    const allArtists = await this.artistService.getAllArtists();
    const allAlbums = await this.albumsService.getAllAlbums();
    const allTracks = await this.trackService.getAllTracks();
    const favorites = this.favoritesService.getAll();

    const favoritesAll = {
      artists: allArtists.filter((artist) =>
        favorites.artists.includes(artist.id),
      ),
      albums: allAlbums.filter((album) => favorites.albums.includes(album.id)),
      tracks: allTracks.filter((track) => favorites.tracks.includes(track.id)),
    };

    return favoritesAll;
  }

  @Delete('track/:id')
  @HttpCode(204)
  @ApiResponse({ description: 'Track was deleted succesfully' })
  deleteTrack(@Param('id', ParseUUIDPipe) trackId: string) {
    const favTrackId = this.favoritesService.findTrackById(trackId);

    if (!favTrackId) {
      throw new HttpException(
        `Track with provided id is not included in favorites`,
        HttpStatus.NOT_FOUND,
      );
    }

    this.favoritesService.deleteTrack(trackId);

    return trackId;
  }

  @Delete('album/:id')
  @HttpCode(204)
  @ApiResponse({ description: 'Album was deleted succesfully' })
  deleteAlbum(@Param('id', ParseUUIDPipe) albumId: string) {
    const favAlbumId = this.favoritesService.findAlbumById(albumId);

    if (!favAlbumId) {
      throw new HttpException(
        `Album with provided id is not included in favorites`,
        HttpStatus.NOT_FOUND,
      );
    }

    this.favoritesService.deleteAlbum(albumId);
  }

  @Delete('artist/:id')
  @HttpCode(204)
  @ApiResponse({ description: 'Artist was deleted succesfully' })
  deleteArtist(@Param('id', ParseUUIDPipe) artistId: string) {
    const favArtistId = this.favoritesService.findArtistById(artistId);

    if (!favArtistId) {
      throw new HttpException(
        `Artist with provided id is not included in favorites`,
        HttpStatus.NOT_FOUND,
      );
    }

    this.favoritesService.deleteArtist(artistId);
  }
}
