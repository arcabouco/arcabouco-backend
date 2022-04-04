import { MigrationInterface, QueryRunner } from "typeorm";

export class createSoftwareImageTable1649044475633
  implements MigrationInterface
{
  name = "createSoftwareImageTable1649044475633";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
			CREATE TABLE "software_image" (
				"id" uuid NOT NULL DEFAULT uuid_generate_v4(),
				"softwareId" uuid NOT NULL,
				"extension" character varying NOT NULL,
				"width" integer NOT NULL,
				"height" integer NOT NULL,
				"size" integer NOT NULL,
				CONSTRAINT "PK_9462b3942249ee4f8788dfd1969" PRIMARY KEY ("id")
			)
    `);

    await queryRunner.query(`
			ALTER TABLE
				"software_image"
			ADD
				CONSTRAINT "FK_7936fd009429e098f055830ba2d" FOREIGN KEY ("softwareId") REFERENCES "software"("id")
				ON DELETE CASCADE
				ON UPDATE NO ACTION
		`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "software_image" DROP CONSTRAINT "FK_7936fd009429e098f055830ba2d"`
    );
    await queryRunner.query(`DROP TABLE "software_image"`);
  }
}
