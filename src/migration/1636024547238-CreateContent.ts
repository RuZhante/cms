import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateContent1636024547238 implements MigrationInterface {
    name = 'CreateContent1636024547238'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "contents" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "tail" character varying NOT NULL, CONSTRAINT "PK_b7c504072e537532d7080c54fac" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "contents_playlists_playlists" ("contentsId" integer NOT NULL, "playlistsId" integer NOT NULL, CONSTRAINT "PK_e9143844f0aed89a58f8011a28e" PRIMARY KEY ("contentsId", "playlistsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_4cb62c30969fab7f6fbe7e8258" ON "contents_playlists_playlists" ("contentsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_f076becba4044599cb0080feef" ON "contents_playlists_playlists" ("playlistsId") `);
        await queryRunner.query(`ALTER TABLE "events" DROP CONSTRAINT "FK_9929fa8516afa13f87b41abb263"`);
        await queryRunner.query(`ALTER TABLE "events" ALTER COLUMN "userId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "screens" DROP CONSTRAINT "FK_9bc222ea626bf47bbb9d86b9f7e"`);
        await queryRunner.query(`ALTER TABLE "screens" DROP CONSTRAINT "FK_9e08a54b3470a9399fd883508d9"`);
        await queryRunner.query(`ALTER TABLE "screens" ALTER COLUMN "userId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "screens" ALTER COLUMN "eventId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "playlists" DROP CONSTRAINT "FK_708a919e9aa49019000d9e9b68e"`);
        await queryRunner.query(`ALTER TABLE "playlists" DROP CONSTRAINT "FK_a236cc636f8ae4cd48f642f6354"`);
        await queryRunner.query(`ALTER TABLE "playlists" ALTER COLUMN "userId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "playlists" ALTER COLUMN "screenId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "events" ADD CONSTRAINT "FK_9929fa8516afa13f87b41abb263" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "screens" ADD CONSTRAINT "FK_9bc222ea626bf47bbb9d86b9f7e" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "screens" ADD CONSTRAINT "FK_9e08a54b3470a9399fd883508d9" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "playlists" ADD CONSTRAINT "FK_708a919e9aa49019000d9e9b68e" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "playlists" ADD CONSTRAINT "FK_a236cc636f8ae4cd48f642f6354" FOREIGN KEY ("screenId") REFERENCES "screens"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "contents_playlists_playlists" ADD CONSTRAINT "FK_4cb62c30969fab7f6fbe7e82586" FOREIGN KEY ("contentsId") REFERENCES "contents"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "contents_playlists_playlists" ADD CONSTRAINT "FK_f076becba4044599cb0080feef9" FOREIGN KEY ("playlistsId") REFERENCES "playlists"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contents_playlists_playlists" DROP CONSTRAINT "FK_f076becba4044599cb0080feef9"`);
        await queryRunner.query(`ALTER TABLE "contents_playlists_playlists" DROP CONSTRAINT "FK_4cb62c30969fab7f6fbe7e82586"`);
        await queryRunner.query(`ALTER TABLE "playlists" DROP CONSTRAINT "FK_a236cc636f8ae4cd48f642f6354"`);
        await queryRunner.query(`ALTER TABLE "playlists" DROP CONSTRAINT "FK_708a919e9aa49019000d9e9b68e"`);
        await queryRunner.query(`ALTER TABLE "screens" DROP CONSTRAINT "FK_9e08a54b3470a9399fd883508d9"`);
        await queryRunner.query(`ALTER TABLE "screens" DROP CONSTRAINT "FK_9bc222ea626bf47bbb9d86b9f7e"`);
        await queryRunner.query(`ALTER TABLE "events" DROP CONSTRAINT "FK_9929fa8516afa13f87b41abb263"`);
        await queryRunner.query(`ALTER TABLE "playlists" ALTER COLUMN "screenId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "playlists" ALTER COLUMN "userId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "playlists" ADD CONSTRAINT "FK_a236cc636f8ae4cd48f642f6354" FOREIGN KEY ("screenId") REFERENCES "screens"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "playlists" ADD CONSTRAINT "FK_708a919e9aa49019000d9e9b68e" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "screens" ALTER COLUMN "eventId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "screens" ALTER COLUMN "userId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "screens" ADD CONSTRAINT "FK_9e08a54b3470a9399fd883508d9" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "screens" ADD CONSTRAINT "FK_9bc222ea626bf47bbb9d86b9f7e" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "events" ALTER COLUMN "userId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "events" ADD CONSTRAINT "FK_9929fa8516afa13f87b41abb263" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f076becba4044599cb0080feef"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4cb62c30969fab7f6fbe7e8258"`);
        await queryRunner.query(`DROP TABLE "contents_playlists_playlists"`);
        await queryRunner.query(`DROP TABLE "contents"`);
    }

}
