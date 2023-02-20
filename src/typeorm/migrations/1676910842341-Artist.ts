import { MigrationInterface, QueryRunner } from "typeorm";
import { ArtistEntity } from '..';

export class Artist1676910842341 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.manager.insert('artists', [
            {
                name: 'Stromae',
                grammy: false,
            },
        ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.manager.clear(ArtistEntity);
    }

}
