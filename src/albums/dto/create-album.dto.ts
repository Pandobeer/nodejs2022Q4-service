import { IsString, IsInt, ValidateIf } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger/dist/decorators';

export class CreateAlbumDto {
  @ApiProperty({ example: 'The Best' })
  @IsString()
  readonly name: string;

  @ApiProperty({ example: 2020 })
  @IsInt()
  year: number;

  @ApiProperty({ format: 'uuid', example: null })
  @IsString()
  @ValidateIf((_object, value) => value !== null)
  artistId: string | null;
}
