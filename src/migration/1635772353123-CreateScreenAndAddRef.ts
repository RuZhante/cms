import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateScreenAndAddRef1635772353123 implements MigrationInterface {
    name = 'CreateScreenAndAddRef1635772353123'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "events" DROP CONSTRAINT "FK_a22a7f5a9d3c290651eb6d17540"`);
        await queryRunner.query(`CREATE TABLE "screens" ("id" SERIAL NOT NULL, "screen_name" character varying NOT NULL, "userId" integer, "eventId" integer, CONSTRAINT "PK_15b65ed44367c5411efccdd7de1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "screens" ADD CONSTRAINT "FK_9bc222ea626bf47bbb9d86b9f7e" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "screens" ADD CONSTRAINT "FK_9e08a54b3470a9399fd883508d9" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "events" ADD CONSTRAINT "FK_9929fa8516afa13f87b41abb263" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "events" DROP CONSTRAINT "FK_9929fa8516afa13f87b41abb263"`);
        await queryRunner.query(`ALTER TABLE "screens" DROP CONSTRAINT "FK_9e08a54b3470a9399fd883508d9"`);
        await queryRunner.query(`ALTER TABLE "screens" DROP CONSTRAINT "FK_9bc222ea626bf47bbb9d86b9f7e"`);
        await queryRunner.query(`DROP TABLE "screens"`);
        await queryRunner.query(`ALTER TABLE "events" ADD CONSTRAINT "FK_a22a7f5a9d3c290651eb6d17540" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
