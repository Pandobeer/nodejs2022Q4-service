import { ApiProperty } from '@nestjs/swagger/dist/decorators';

export class ArtistEntity {
  @ApiProperty({ format: 'uuid' })
  id: string;

  @ApiProperty({ example: 'Stromae' })
  name: string;

  @ApiProperty({ example: false })
  grammy: boolean;

  constructor(entity: ArtistEntity) {
    Object.assign(this, entity);
  }
}
