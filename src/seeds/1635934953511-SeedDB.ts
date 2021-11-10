import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedDB1635934953511 implements MigrationInterface {
  name = 'SeedDB1635934953511';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // password: 123456
    await queryRunner.query(`
      INSERT INTO users (email, password) VALUES('test@test.com', '$2b$10$35xcxWdabZmxEmSIA.VpoOj2/mxzT7NOW//6Qagb/h8Oq2jAzvdCm');
    `);
  }

  public async down(): Promise<void> {}
}
