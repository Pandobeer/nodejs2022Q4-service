import { IsBoolean, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger/dist/decorators';

export class CreateArtistDto {
  @ApiProperty({ example: 'Stromae' })
  @IsString({ message: 'Artist name must be a string' })
  name: string;

  @ApiProperty({ example: false })
  @IsBoolean({ message: 'Grammy must be a boolean' })
  grammy: boolean;
}
