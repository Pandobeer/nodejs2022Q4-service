import { IsString, IsInt, IsOptional } from 'class-validator';

export class CreateTrackDto {
    @IsString()
    readonly name: string;

    @IsInt()
    readonly duration: number;

    @IsString()
    readonly artistId: string;

    @IsString()
    @IsOptional()
    albumId: string | null;
}