import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateEventAndAddRefBetweenUser1635756178833
  implements MigrationInterface
{
  name = 'CreateEventAndAddRefBetweenUser1635756178833';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "events" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "userId" integer, CONSTRAINT "PK_c5675e66b601bd4d0882054a430" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "events" ADD CONSTRAINT "FK_a22a7f5a9d3c290651eb6d17540" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "events" DROP CONSTRAINT "FK_a22a7f5a9d3c290651eb6d17540"`,
    );
    await queryRunner.query(`DROP TABLE "events"`);
  }
}
