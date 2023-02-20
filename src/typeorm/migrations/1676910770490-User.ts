import { MigrationInterface, QueryRunner } from 'typeorm';

export class User1676910770490 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.insert('users', [
      {
        login: 'Mik',
        password: '12345',
      },
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`TRUNCATE TABLE users CASCADE`);
  }
}
