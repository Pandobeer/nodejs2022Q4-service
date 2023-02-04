import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes, HttpStatus, HttpCode, ClassSerializerInterceptor, UseInterceptors, Inject } from '@nestjs/common';
import { ParseUUIDPipe, ValidationPipe } from '@nestjs/common/pipes';
import { HttpException } from '@nestjs/common';
// import { isUUID } from 'class-validator';
import { TrackService } from './track.service';
import { TrackEntity } from '../entities/track.entity';
import { CreateTrackDto } from '../dto/create-track.dto';
import { TrackDto } from '../dto/track.dto';
import { UpdateTrackDto } from '../dto/update-track.dto';
import { ArtistService } from 'src/artists/artist/artist.service';

@Controller('track')
export class TrackController {
    constructor(private readonly trackService: TrackService) { }
    @Inject(ArtistService)
    private readonly artistService: ArtistService;

    @UseInterceptors(ClassSerializerInterceptor)
    @Post()
    @HttpCode(201)
    @UsePipes(new ValidationPipe({ whitelist: true }))
    async create(@Body() createTrackDto: CreateTrackDto): Promise<TrackEntity> {
        const newTrack = await this.trackService.create(createTrackDto);

        return newTrack;
    }

    @Get()
    async getAll(): Promise<TrackEntity[]> {
        return this.trackService.getAllTracks();
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Get('/:id')
    @UsePipes(new ValidationPipe({ whitelist: true }))

    async findOne(@Param('id', ParseUUIDPipe) id: string) {

        const track: TrackDto = this.trackService.findOne(id);

        if (!track) {
            throw new HttpException(`Track with provided id does not exist`, HttpStatus.NOT_FOUND);
        }

        return track;
    }

    // @UseInterceptors(ClassSerializerInterceptor)
    @Put('/:id')
    @UsePipes(new ValidationPipe({ whitelist: true }))
    async update(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updateTrackDto: UpdateTrackDto): Promise<TrackEntity> {

        const track = this.trackService.findOne(id);

        if (!track) {
            throw new HttpException(`Track with provided id does not exist`, HttpStatus.NOT_FOUND);
        }

        return await this.trackService.update(id, updateTrackDto);
    }

    @Delete('/:id')
    @HttpCode(204)
    async remove(@Param('id', ParseUUIDPipe) id: string) {
        // if (!isUUID(id)) {
        //     throw new HttpException(`Invalid artist Id`, HttpStatus.BAD_REQUEST);
        // }

        const trackToDelete = this.trackService.findOne(id);

        if (!trackToDelete) {
            throw new HttpException(`Track with provided id does not exist`, HttpStatus.NOT_FOUND);
        }

        this.trackService.delete(id);
    }
}
