import { MigrationInterface, QueryRunner } from "typeorm";
import { FavoriteEntity } from '..';

export class Favorite1676910867432 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.manager.insert('favorites', [
            {
                artistsIds: [],
                albumsIds: [],
                tracksIds: [],
            },
        ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.manager.clear('favorites');
    }
}
