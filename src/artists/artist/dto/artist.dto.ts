import { CreateArtistDto } from './create-artist.dto';
import { IsString, IsBoolean, IsUUID } from 'class-validator';

export class ArtistDto extends CreateArtistDto {
  @IsUUID()
  readonly id: string;

  @IsString()
  readonly name: string;

  @IsBoolean()
  readonly grammy: boolean;
}
