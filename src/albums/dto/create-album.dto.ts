import { IsString, IsInt, IsOptional } from 'class-validator';

export class CreateAlbumDto {
    @IsString()
    readonly name: string;

    @IsInt()
    year: number;

    @IsString()
    @IsOptional()
    artistId: string | null;
}
