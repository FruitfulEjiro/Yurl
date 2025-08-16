import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTokenExpToUserTable1755297951357 implements MigrationInterface {
    name = 'AddTokenExpToUserTable1755297951357'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "tokenExp" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "tokenExp"`);
    }

}
