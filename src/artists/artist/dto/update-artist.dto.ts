import { PartialType } from '@nestjs/mapped-types';
import { ArtistDto } from './artist.dto';

export class UpdateArtistDto extends PartialType(ArtistDto) { }