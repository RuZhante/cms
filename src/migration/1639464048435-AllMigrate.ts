import {MigrationInterface, QueryRunner} from "typeorm";

export class AllMigrate1639464048435 implements MigrationInterface {
    name = 'AllMigrate1639464048435'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" character varying NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "events" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "userId" character varying NOT NULL, CONSTRAINT "PK_40731c7151fe4be3116e45ddf73" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "screens" ("id" SERIAL NOT NULL, "screenName" character varying NOT NULL, "userId" character varying NOT NULL, "eventId" integer NOT NULL, CONSTRAINT "PK_15b65ed44367c5411efccdd7de1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "playlists" ("id" SERIAL NOT NULL, "playlistName" character varying NOT NULL, "userId" character varying NOT NULL, "screenId" integer NOT NULL, CONSTRAINT "REL_a236cc636f8ae4cd48f642f635" UNIQUE ("screenId"), CONSTRAINT "PK_a4597f4189a75d20507f3f7ef0d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "contents" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "extension" character varying NOT NULL, "duration" integer, "userId" character varying NOT NULL, CONSTRAINT "PK_b7c504072e537532d7080c54fac" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "contents_playlists_playlists" ("contentsId" integer NOT NULL, "playlistsId" integer NOT NULL, CONSTRAINT "PK_e9143844f0aed89a58f8011a28e" PRIMARY KEY ("contentsId", "playlistsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_4cb62c30969fab7f6fbe7e8258" ON "contents_playlists_playlists" ("contentsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_f076becba4044599cb0080feef" ON "contents_playlists_playlists" ("playlistsId") `);
        await queryRunner.query(`ALTER TABLE "events" ADD CONSTRAINT "FK_9929fa8516afa13f87b41abb263" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "screens" ADD CONSTRAINT "FK_9bc222ea626bf47bbb9d86b9f7e" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "screens" ADD CONSTRAINT "FK_9e08a54b3470a9399fd883508d9" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "playlists" ADD CONSTRAINT "FK_708a919e9aa49019000d9e9b68e" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "playlists" ADD CONSTRAINT "FK_a236cc636f8ae4cd48f642f6354" FOREIGN KEY ("screenId") REFERENCES "screens"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "contents" ADD CONSTRAINT "FK_191675b22eb3ee27cda4aeb0f5f" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "contents_playlists_playlists" ADD CONSTRAINT "FK_4cb62c30969fab7f6fbe7e82586" FOREIGN KEY ("contentsId") REFERENCES "contents"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "contents_playlists_playlists" ADD CONSTRAINT "FK_f076becba4044599cb0080feef9" FOREIGN KEY ("playlistsId") REFERENCES "playlists"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contents_playlists_playlists" DROP CONSTRAINT "FK_f076becba4044599cb0080feef9"`);
        await queryRunner.query(`ALTER TABLE "contents_playlists_playlists" DROP CONSTRAINT "FK_4cb62c30969fab7f6fbe7e82586"`);
        await queryRunner.query(`ALTER TABLE "contents" DROP CONSTRAINT "FK_191675b22eb3ee27cda4aeb0f5f"`);
        await queryRunner.query(`ALTER TABLE "playlists" DROP CONSTRAINT "FK_a236cc636f8ae4cd48f642f6354"`);
        await queryRunner.query(`ALTER TABLE "playlists" DROP CONSTRAINT "FK_708a919e9aa49019000d9e9b68e"`);
        await queryRunner.query(`ALTER TABLE "screens" DROP CONSTRAINT "FK_9e08a54b3470a9399fd883508d9"`);
        await queryRunner.query(`ALTER TABLE "screens" DROP CONSTRAINT "FK_9bc222ea626bf47bbb9d86b9f7e"`);
        await queryRunner.query(`ALTER TABLE "events" DROP CONSTRAINT "FK_9929fa8516afa13f87b41abb263"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f076becba4044599cb0080feef"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4cb62c30969fab7f6fbe7e8258"`);
        await queryRunner.query(`DROP TABLE "contents_playlists_playlists"`);
        await queryRunner.query(`DROP TABLE "contents"`);
        await queryRunner.query(`DROP TABLE "playlists"`);
        await queryRunner.query(`DROP TABLE "screens"`);
        await queryRunner.query(`DROP TABLE "events"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
