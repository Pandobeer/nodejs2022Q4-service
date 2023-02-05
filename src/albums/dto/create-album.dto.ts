import { IsString, IsInt, ValidateIf } from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  readonly name: string;

  @IsInt()
  year: number;

  @IsString()
  @ValidateIf((_object, value) => value !== null)
  artistId: string | null;
}
