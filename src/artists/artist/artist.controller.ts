import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  // HttpStatus,
  HttpCode,
  ClassSerializerInterceptor,
  UseInterceptors,
  Inject,
} from '@nestjs/common';
import { ParseUUIDPipe, ValidationPipe } from '@nestjs/common/pipes';
// import { HttpException } from '@nestjs/common';
// import { isUUID } from 'class-validator';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from '../dto/create-artist.dto';
import { UpdateArtistDto } from '../dto/update-artist.dto';
// import { ArtistEntity } from '../entities/artist.entity';
import { TrackService } from './../../tracks/track/track.service';
import { AlbumsService } from 'src/albums/album/albums.service';
import { ApiTags } from '@nestjs/swagger/dist';

@ApiTags('Artists')
@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) { }

  // @Inject(TrackService)
  // private readonly trackService: TrackService;

  // @Inject(AlbumsService)
  // private readonly albumsService: AlbumsService;

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  @HttpCode(201)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  create(@Body() createArtistDto: CreateArtistDto) {
    // const newArtist = this.artistService.create(createArtistDto);

    // return newArtist;
    return this.artistService.create(createArtistDto);
  }

  @Get()
  getAll() {
    return this.artistService.getAllArtists();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/:id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    // const artist = this.artistService.findOne(id);

    // if (!artist) {
    //   throw new HttpException(
    //     `Artist with provided id does not exist`,
    //     HttpStatus.NOT_FOUND,
    //   );
    // }

    // return artist;
    return this.artistService.findOne(id);
  }

  @Put('/:id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    // const artist = this.artistService.findOne(id);

    // if (!artist) {
    //   throw new HttpException(
    //     `Artist with provided id does not exist`,
    //     HttpStatus.NOT_FOUND,
    //   );
    // }

    // const updatedArtist = this.artistService.update(id, updateArtistDto);

    // return updatedArtist;
    return this.artistService.update(id, updateArtistDto);
  }

  @Delete('/:id')
  @HttpCode(204)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    // if (!isUUID(id)) {
    //   throw new HttpException(`Invalid artist Id`, HttpStatus.BAD_REQUEST);
    // }

    // const artistToDelete = this.artistService.findOne(id);

    // if (!artistToDelete) {
    //   throw new HttpException(
    //     `Artist with provided id does not exist`,
    //     HttpStatus.NOT_FOUND,
    //   );
    // }

    // this.trackService.updateArtistIdsInTracks(id);
    // this.albumsService.updateArtistIdsInAlbums(id);

    return this.artistService.delete(id);
  }
}
