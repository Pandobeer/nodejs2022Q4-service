import { ApiProperty } from '@nestjs/swagger/dist/decorators';
export class TrackEntity {
  @ApiProperty({ format: 'uuid' })
  id: string;

  @ApiProperty({ example: 'Hey Ho' })
  name: string;

  @ApiProperty({ format: 'uuid', example: null })
  artistId: string | null;

  @ApiProperty({ format: 'uuid', example: null })
  albumId: string | null;

  @ApiProperty({ example: 262 })
  duration: number;
}
