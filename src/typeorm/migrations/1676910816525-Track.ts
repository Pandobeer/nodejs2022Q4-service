import { MigrationInterface, QueryRunner } from 'typeorm';

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
    await queryRunner.query(`TRUNCATE TABLE tracks CASCADE`);
  }
}
