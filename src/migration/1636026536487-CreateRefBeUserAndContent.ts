import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateRefBeUserAndContent1636026536487 implements MigrationInterface {
    name = 'CreateRefBeUserAndContent1636026536487'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contents" ADD "userId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "contents" ADD CONSTRAINT "FK_191675b22eb3ee27cda4aeb0f5f" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contents" DROP CONSTRAINT "FK_191675b22eb3ee27cda4aeb0f5f"`);
        await queryRunner.query(`ALTER TABLE "contents" DROP COLUMN "userId"`);
    }

}
