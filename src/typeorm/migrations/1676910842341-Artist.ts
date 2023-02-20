import { MigrationInterface, QueryRunner } from 'typeorm';

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
    await queryRunner.query(`TRUNCATE TABLE artists CASCADE`);
  }
}
