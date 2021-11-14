import {MigrationInterface, QueryRunner} from "typeorm";

export class FixContent1636792475180 implements MigrationInterface {
    name = 'FixContent1636792475180'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contents_playlists_playlists" DROP CONSTRAINT "FK_f076becba4044599cb0080feef9"`);
        await queryRunner.query(`ALTER TABLE "screens" RENAME COLUMN "screen_name" TO "screenName"`);
        await queryRunner.query(`ALTER TABLE "playlists" RENAME COLUMN "playlist_name" TO "playlistName"`);
        await queryRunner.query(`ALTER TABLE "contents" DROP COLUMN "tail"`);
        await queryRunner.query(`ALTER TABLE "contents" ADD "extension" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "contents" ADD "duration" integer`);
        await queryRunner.query(`ALTER TABLE "contents_playlists_playlists" ADD CONSTRAINT "FK_f076becba4044599cb0080feef9" FOREIGN KEY ("playlistsId") REFERENCES "playlists"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contents_playlists_playlists" DROP CONSTRAINT "FK_f076becba4044599cb0080feef9"`);
        await queryRunner.query(`ALTER TABLE "contents" DROP COLUMN "duration"`);
        await queryRunner.query(`ALTER TABLE "contents" DROP COLUMN "extension"`);
        await queryRunner.query(`ALTER TABLE "contents" ADD "tail" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "playlists" RENAME COLUMN "playlistName" TO "playlist_name"`);
        await queryRunner.query(`ALTER TABLE "screens" RENAME COLUMN "screenName" TO "screen_name"`);
        await queryRunner.query(`ALTER TABLE "contents_playlists_playlists" ADD CONSTRAINT "FK_f076becba4044599cb0080feef9" FOREIGN KEY ("playlistsId") REFERENCES "playlists"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
