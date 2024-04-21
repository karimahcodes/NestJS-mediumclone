import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPronounsToUsers1713701253768 implements MigrationInterface {
    name = 'AddPronounsToUsers1713701253768'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "pronouns" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "pronouns"`);
    }

}
