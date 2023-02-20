import { MigrationInterface, QueryRunner } from 'typeorm';
import { AlbumEntity } from '..';

export class Album1676910794696 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.insert('albums', [
      {
        name: 'The Best',
        year: 2020,
      },
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.clear(AlbumEntity);
  }
}
