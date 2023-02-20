import { IsString, IsInt, ValidateIf } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger/dist/decorators';

export class CreateTrackDto {
  @ApiProperty({ example: 'Hey Ho' })
  @IsString({ message: 'Track name must be a string' })
  name: string;

  @ApiProperty({ example: 262 })
  @IsInt()
  duration: number;

  @ApiProperty({ format: 'uuid', example: null })
  @IsString()
  @ValidateIf((_object, value) => value !== null)
  artistId: string | null;

  @ApiProperty({ format: 'uuid', example: null })
  @IsString()
  @ValidateIf((_object, value) => value !== null)
  albumId: string | null;
}
