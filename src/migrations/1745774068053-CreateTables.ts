import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1745774068053 implements MigrationInterface {
    name = 'CreateTables1745774068053'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "guests" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "uniqueLinkToken" character varying NOT NULL, "rsvpStatus" character varying NOT NULL DEFAULT 'pending', "comment" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_3a63f1da06a146b348ea311221a" UNIQUE ("uniqueLinkToken"), CONSTRAINT "PK_4948267e93869ddcc6b340a2c46" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "guests"`);
    }

}
