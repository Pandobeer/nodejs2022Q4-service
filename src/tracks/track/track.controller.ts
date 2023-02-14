import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  HttpCode,
  ClassSerializerInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { ParseUUIDPipe, ValidationPipe } from '@nestjs/common/pipes';
// import { HttpException } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackEntity } from '../entities/track.entity';
import { CreateTrackDto } from '../dto/create-track.dto';
import { UpdateTrackDto } from '../dto/update-track.dto';
// import { ArtistService } from 'src/artists/artist/artist.service';
import { ApiTags } from '@nestjs/swagger/dist';

@ApiTags('Tracks')
@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) { }
  // @Inject(ArtistService)
  // private readonly artistService: ArtistService;

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  @HttpCode(201)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  create(@Body() createTrackDto: CreateTrackDto) {
    // const newTrack = this.trackService.create(createTrackDto);

    // return newTrack;
    return this.trackService.create(createTrackDto);
  }

  @Get()
  getAll() {
    return this.trackService.getAllTracks();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/:id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    // const track = this.trackService.findOne(id);

    // if (!track) {
    //   throw new HttpException(
    //     `Track with provided id does not exist`,
    //     HttpStatus.NOT_FOUND,
    //   );
    // }

    // return track;
    return this.trackService.findOne(id);
  }

  @Put('/:id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    // const track = this.trackService.findOne(id);

    // if (!track) {
    //   throw new HttpException(
    //     `Track with provided id does not exist`,
    //     HttpStatus.NOT_FOUND,
    //   );
    // }

    return this.trackService.update(id, updateTrackDto);
  }

  @Delete('/:id')
  @HttpCode(204)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    // const trackToDelete = this.trackService.findOne(id);

    // if (!trackToDelete) {
    //   throw new HttpException(
    //     `Track with provided id does not exist`,
    //     HttpStatus.NOT_FOUND,
    //   );
    // }

    this.trackService.delete(id);
  }
}
