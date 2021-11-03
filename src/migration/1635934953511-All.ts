import {MigrationInterface, QueryRunner} from "typeorm";

export class All1635934953511 implements MigrationInterface {
    name = 'All1635934953511'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "playlists" ("id" SERIAL NOT NULL, "playlist_name" character varying NOT NULL, "userId" integer, "screenId" integer, CONSTRAINT "REL_a236cc636f8ae4cd48f642f635" UNIQUE ("screenId"), CONSTRAINT "PK_a4597f4189a75d20507f3f7ef0d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "screens" ("id" SERIAL NOT NULL, "screen_name" character varying NOT NULL, "userId" integer, "eventId" integer, CONSTRAINT "PK_15b65ed44367c5411efccdd7de1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "events" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "userId" integer, CONSTRAINT "PK_40731c7151fe4be3116e45ddf73" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "playlists" ADD CONSTRAINT "FK_708a919e9aa49019000d9e9b68e" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "playlists" ADD CONSTRAINT "FK_a236cc636f8ae4cd48f642f6354" FOREIGN KEY ("screenId") REFERENCES "screens"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "screens" ADD CONSTRAINT "FK_9bc222ea626bf47bbb9d86b9f7e" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "screens" ADD CONSTRAINT "FK_9e08a54b3470a9399fd883508d9" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "events" ADD CONSTRAINT "FK_9929fa8516afa13f87b41abb263" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "events" DROP CONSTRAINT "FK_9929fa8516afa13f87b41abb263"`);
        await queryRunner.query(`ALTER TABLE "screens" DROP CONSTRAINT "FK_9e08a54b3470a9399fd883508d9"`);
        await queryRunner.query(`ALTER TABLE "screens" DROP CONSTRAINT "FK_9bc222ea626bf47bbb9d86b9f7e"`);
        await queryRunner.query(`ALTER TABLE "playlists" DROP CONSTRAINT "FK_a236cc636f8ae4cd48f642f6354"`);
        await queryRunner.query(`ALTER TABLE "playlists" DROP CONSTRAINT "FK_708a919e9aa49019000d9e9b68e"`);
        await queryRunner.query(`DROP TABLE "events"`);
        await queryRunner.query(`DROP TABLE "screens"`);
        await queryRunner.query(`DROP TABLE "playlists"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
