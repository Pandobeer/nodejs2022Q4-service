import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger/dist';
import { HttpCode } from '@nestjs/common/decorators';

@ApiTags('Favs')
@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post('track/:id')
  createFavTrack(@Param('id', ParseUUIDPipe) trackId: string) {
    return this.favoritesService.createFavTrack(trackId);
  }

  @Post('album/:id')
  createFavAlbum(@Param('id', ParseUUIDPipe) albumId: string) {
    return this.favoritesService.createFavAlbum(albumId);
  }

  @Post('artist/:id')
  createFavArtist(@Param('id', ParseUUIDPipe) artistId: string) {
    return this.favoritesService.createFavArtist(artistId);
  }

  @Get()
  async getAll() {
    return this.favoritesService.getAll();
  }

  @Delete('track/:id')
  @HttpCode(204)
  @ApiResponse({ description: 'Track was deleted succesfully' })
  deleteTrack(@Param('id', ParseUUIDPipe) trackId: string) {
    return this.favoritesService.deleteTrack(trackId);
  }

  @Delete('album/:id')
  @HttpCode(204)
  @ApiResponse({ description: 'Album was deleted succesfully' })
  deleteAlbum(@Param('id', ParseUUIDPipe) albumId: string) {
    return this.favoritesService.deleteAlbum(albumId);
  }

  @Delete('artist/:id')
  @HttpCode(204)
  @ApiResponse({ description: 'Artist was deleted succesfully' })
  deleteArtist(@Param('id', ParseUUIDPipe) artistId: string) {
    return this.favoritesService.deleteArtist(artistId);
  }
}
