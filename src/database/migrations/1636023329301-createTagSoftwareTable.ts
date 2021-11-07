import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createTagSoftwareTable1636023329301 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "tag_softwares_software",
        columns: [
          {
            name: "id",
            type: "uuid",
            generationStrategy: "uuid",
            isGenerated: true,
          },
          {
            name: "tagId",
            type: "uuid",
          },
          {
            name: "softwareId",
            type: "uuid",
          },
        ],
        foreignKeys: [
          {
            columnNames: ["tagId"],
            referencedTableName: "tag",
            referencedColumnNames: ["id"],
          },
          {
            columnNames: ["softwareId"],
            referencedTableName: "software",
            referencedColumnNames: ["id"],
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("tag_software");
  }
}
