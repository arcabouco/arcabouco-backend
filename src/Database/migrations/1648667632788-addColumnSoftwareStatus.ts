import { MigrationInterface, QueryRunner } from "typeorm";

export class addColumnSoftwareStatus1648667632788
  implements MigrationInterface
{
  name = "addColumnSoftwareStatus1648667632788";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."software_status_enum" AS ENUM('draft', 'published', 'analyzing')`
    );
    await queryRunner.query(
      `ALTER TABLE "software" ADD "status" "public"."software_status_enum" NOT NULL`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "software" DROP COLUMN "status"`);
    await queryRunner.query(`DROP TYPE "public"."software_status_enum"`);
  }
}
