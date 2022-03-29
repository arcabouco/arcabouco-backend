import {MigrationInterface, QueryRunner} from "typeorm";

export class TagAndTagCategoryTables1648578041073 implements MigrationInterface {
    name = 'TagAndTagCategoryTables1648578041073'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tag_category" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying, "isMultiTag" boolean NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_3249fd70734f41f513a1d5d3ef7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tag" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "tagCategoryId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_8e4052373c579afc1471f526760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tag_softwares_software" ("tagId" uuid NOT NULL, "softwareId" uuid NOT NULL, CONSTRAINT "PK_83d19cc684c93c4ecc763ff5ea7" PRIMARY KEY ("tagId", "softwareId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_bf5d9d5faf4aaaa2342da394c0" ON "tag_softwares_software" ("tagId") `);
        await queryRunner.query(`CREATE INDEX "IDX_dc02c22f0b55291571a7955ded" ON "tag_softwares_software" ("softwareId") `);
        await queryRunner.query(`ALTER TABLE "tag" ADD CONSTRAINT "FK_0183cbdd216b406b003c89ff8a7" FOREIGN KEY ("tagCategoryId") REFERENCES "tag_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tag_softwares_software" ADD CONSTRAINT "FK_bf5d9d5faf4aaaa2342da394c03" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "tag_softwares_software" ADD CONSTRAINT "FK_dc02c22f0b55291571a7955ded8" FOREIGN KEY ("softwareId") REFERENCES "software"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tag_softwares_software" DROP CONSTRAINT "FK_dc02c22f0b55291571a7955ded8"`);
        await queryRunner.query(`ALTER TABLE "tag_softwares_software" DROP CONSTRAINT "FK_bf5d9d5faf4aaaa2342da394c03"`);
        await queryRunner.query(`ALTER TABLE "tag" DROP CONSTRAINT "FK_0183cbdd216b406b003c89ff8a7"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_dc02c22f0b55291571a7955ded"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_bf5d9d5faf4aaaa2342da394c0"`);
        await queryRunner.query(`DROP TABLE "tag_softwares_software"`);
        await queryRunner.query(`DROP TABLE "tag"`);
        await queryRunner.query(`DROP TABLE "tag_category"`);
    }

}
