import {MigrationInterface, QueryRunner} from "typeorm";

export class initDatabase1648734587880 implements MigrationInterface {
    name = 'initDatabase1648734587880'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."software_status_enum" AS ENUM('draft', 'published', 'analyzing')`);
        await queryRunner.query(`CREATE TABLE "software" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying, "link" character varying, "status" "public"."software_status_enum" NOT NULL, "createdBy" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_3ceec82cc90b32643b07e8d9841" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tag" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "tagCategoryId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_8e4052373c579afc1471f526760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tag_category" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying, "isMultiTag" boolean NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_3249fd70734f41f513a1d5d3ef7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."user_role_enum" AS ENUM('USER', 'EVALUATOR', 'ADMIN')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "signupToken" character varying, "recoveryToken" character varying, "role" "public"."user_role_enum" NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "software_tag" ("tagId" uuid NOT NULL, "softwareId" uuid NOT NULL, CONSTRAINT "PK_b4c6e569eb1b72dc81563b1edde" PRIMARY KEY ("tagId", "softwareId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_a054f26c8c8fcd35699d75cafd" ON "software_tag" ("tagId") `);
        await queryRunner.query(`CREATE INDEX "IDX_03afd8fa2facb1ac569f8da6ba" ON "software_tag" ("softwareId") `);
        await queryRunner.query(`ALTER TABLE "software" ADD CONSTRAINT "FK_aaddc20492546fcc282f93ca0b1" FOREIGN KEY ("createdBy") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tag" ADD CONSTRAINT "FK_0183cbdd216b406b003c89ff8a7" FOREIGN KEY ("tagCategoryId") REFERENCES "tag_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "software_tag" ADD CONSTRAINT "FK_a054f26c8c8fcd35699d75cafdf" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "software_tag" ADD CONSTRAINT "FK_03afd8fa2facb1ac569f8da6bae" FOREIGN KEY ("softwareId") REFERENCES "software"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "software_tag" DROP CONSTRAINT "FK_03afd8fa2facb1ac569f8da6bae"`);
        await queryRunner.query(`ALTER TABLE "software_tag" DROP CONSTRAINT "FK_a054f26c8c8fcd35699d75cafdf"`);
        await queryRunner.query(`ALTER TABLE "tag" DROP CONSTRAINT "FK_0183cbdd216b406b003c89ff8a7"`);
        await queryRunner.query(`ALTER TABLE "software" DROP CONSTRAINT "FK_aaddc20492546fcc282f93ca0b1"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_03afd8fa2facb1ac569f8da6ba"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a054f26c8c8fcd35699d75cafd"`);
        await queryRunner.query(`DROP TABLE "software_tag"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
        await queryRunner.query(`DROP TABLE "tag_category"`);
        await queryRunner.query(`DROP TABLE "tag"`);
        await queryRunner.query(`DROP TABLE "software"`);
        await queryRunner.query(`DROP TYPE "public"."software_status_enum"`);
    }

}
