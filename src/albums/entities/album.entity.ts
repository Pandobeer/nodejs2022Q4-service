import { ApiProperty } from '@nestjs/swagger/dist/decorators';

export class AlbumEntity {
  @ApiProperty({ format: 'uuid' })
  id: string;

  @ApiProperty({ example: 'The Best' })
  name: string;

  @ApiProperty({ example: 2020 })
  year: number;

  @ApiProperty({ format: 'uuid', example: null })
  artistId: string | null;
}
