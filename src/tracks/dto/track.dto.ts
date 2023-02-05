import { CreateTrackDto } from './create-track.dto';
import { IsUUID } from 'class-validator';

export class TrackDto extends CreateTrackDto {
  @IsUUID()
  readonly id: string;
}
