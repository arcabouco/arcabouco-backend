import { MigrationInterface, QueryRunner } from "typeorm";

export class createUserTable1648581998903 implements MigrationInterface {
  name = "createUserTable1648581998903";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TYPE "public"."user_role_enum" AS ENUM('USER', 'EVALUATOR', 'ADMIN')
    `);

    await queryRunner.query(`
      CREATE TABLE "user" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "name" character varying NOT NULL,
        "lastName" character varying NOT NULL,
        "email" character varying NOT NULL,
        "password" character varying NOT NULL,
        "signupToken" character varying,
        "recoveryToken" character varying,
        "role" "public"."user_role_enum" NOT NULL,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        "deletedAt" TIMESTAMP,
        CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
      )
    `);

    await queryRunner.query(`
      ALTER TABLE "software" ADD "createdBy" character varying NOT NULL
    `);

    await queryRunner.query(`ALTER TABLE "software" ADD "userId" uuid`);

    await queryRunner.query(`
      ALTER TABLE "software" ADD CONSTRAINT "FK_ab3f56b9b41ac3ddc9cd42c3f12"
        FOREIGN KEY ("userId")
        REFERENCES "user"("id")
        ON DELETE NO ACTION
        ON UPDATE NO ACTION
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "software" DROP CONSTRAINT "FK_ab3f56b9b41ac3ddc9cd42c3f12"`
    );
    await queryRunner.query(`ALTER TABLE "software" DROP COLUMN "userId"`);
    await queryRunner.query(`ALTER TABLE "software" DROP COLUMN "createdBy"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
  }
}
