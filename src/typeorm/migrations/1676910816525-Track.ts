import { MigrationInterface, QueryRunner } from "typeorm";
import { TrackEntity } from '..';

export class Track1676910816525 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.manager.insert('tracks', [
            {
                name: 'Hey Ho',
                duration: 262,
            },
        ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.manager.clear(TrackEntity);
    }

}
