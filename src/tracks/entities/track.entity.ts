export class TrackEntity {
    id: string;
    name: string;
    artistId: string | null;
    albumId: string | null;
    duration: number;

    //    constructor(partial: Partial<UserEntity>) {
    //     Object.assign(this, partial);
    // }
}