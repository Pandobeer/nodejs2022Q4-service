import { IsString, IsInt, ValidateIf } from 'class-validator';

export class CreateTrackDto {
    @IsString()
    readonly name: string;

    @IsInt()
    readonly duration: number;

    @IsString()
    @ValidateIf((_object, value) => value !== null)
    readonly artistId: string | null;

    @IsString()
    @ValidateIf((_object, value) => value !== null)
    albumId: string | null;
}