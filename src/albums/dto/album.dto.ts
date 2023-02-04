import { IsUUID } from 'class-validator';
import { CreateAlbumDto } from "./create-album.dto";

export class AlbumDto extends CreateAlbumDto {
    @IsUUID()
    readonly id: string;
}