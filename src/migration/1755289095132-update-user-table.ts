import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUserTable1755289095132 implements MigrationInterface {
    name = 'UpdateUserTable1755289095132'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "refreshToken" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "refreshToken"`);
    }

}
