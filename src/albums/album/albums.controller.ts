import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UsePipes,
  Put,
  HttpCode,
} from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from '../dto/create-album.dto';
import { UpdateAlbumDto } from '../dto/update-album.dto';
import { ParseUUIDPipe, ValidationPipe } from '@nestjs/common/pipes';
import { ApiTags } from '@nestjs/swagger/dist';

@ApiTags('Albums')
@Controller('album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) { }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  create(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumsService.create(createAlbumDto);
  }

  @Get()
  findAll() {
    return this.albumsService.getAllAlbums();
  }

  @Get('/:id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  findOne(@Param('id', ParseUUIDPipe) id: string) {

    return this.albumsService.findOne(id);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {

    return this.albumsService.update(id, updateAlbumDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.albumsService.delete(id);
  }
}
