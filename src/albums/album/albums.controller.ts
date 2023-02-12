import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Inject,
  UsePipes,
  Put,
  HttpCode,
} from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from '../dto/create-album.dto';
import { UpdateAlbumDto } from '../dto/update-album.dto';
import { ParseUUIDPipe, ValidationPipe } from '@nestjs/common/pipes';
import { AlbumEntity } from '../entities/album.entity';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';
import { TrackService } from 'src/tracks/track/track.service';
import { ApiTags } from '@nestjs/swagger/dist';

@ApiTags('Albums')
@Controller('album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Inject(TrackService)
  private readonly trackService: TrackService;

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  create(@Body() createAlbumDto: CreateAlbumDto): AlbumEntity {
    return this.albumsService.create(createAlbumDto);
  }

  @Get()
  findAll() {
    return this.albumsService.findAll();
  }

  @Get('/:id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    const album = this.albumsService.findOne(id);

    if (!album) {
      throw new HttpException(
        `Album with provided id does not exist`,
        HttpStatus.NOT_FOUND,
      );
    }

    return album;
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    const album = this.albumsService.findOne(id);

    if (!album) {
      throw new HttpException(
        `Album with provided id does not exist`,
        HttpStatus.NOT_FOUND,
      );
    }

    return this.albumsService.update(id, updateAlbumDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    const albumToDelete = this.albumsService.findOne(id);

    if (!albumToDelete) {
      throw new HttpException(
        `Album with provided id does not exist`,
        HttpStatus.NOT_FOUND,
      );
    }

    this.trackService.updateAlbumIds(id);

    this.albumsService.remove(id);
  }
}
