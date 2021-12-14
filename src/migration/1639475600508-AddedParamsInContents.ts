import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddedParamsInContents1639475600508 implements MigrationInterface {
  name = 'AddedParamsInContents1639475600508';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "contents" ADD "orientation" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "contents" ADD "screenResolution" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "contents" DROP COLUMN "screenResolution"`,
    );
    await queryRunner.query(`ALTER TABLE "contents" DROP COLUMN "orientation"`);
  }
}
