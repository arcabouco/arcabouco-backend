import { MigrationInterface, QueryRunner } from "typeorm";

export class createSoftwareTable1648576811191 implements MigrationInterface {
  name = "createSoftwareTable1648576811191";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
			CREATE TABLE "software" (
				"id" uuid NOT NULL DEFAULT uuid_generate_v4(),
				"name" character varying NOT NULL,
				"description" character varying,
				"link" character varying,
				"createdAt" TIMESTAMP NOT NULL DEFAULT now(),
				"updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
				CONSTRAINT "PK_3ceec82cc90b32643b07e8d9841" PRIMARY KEY ("id")
			)
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "software"`);
  }
}
