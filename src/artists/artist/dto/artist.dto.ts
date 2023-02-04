import { CreateArtistDto } from "./create-artist.dto";
import { IsString, IsBoolean } from 'class-validator';

export class ArtistDto extends CreateArtistDto {
    @IsString()
    readonly id: string;

    @IsString()
    readonly name: string;

    @IsBoolean()
    readonly grammy: boolean;
}