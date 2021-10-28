import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createTagTable1634804525161 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "tag",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
          },
          {
            name: "name",
            type: "varchar",
          },
          {
            name: "softwareId",
            type: "uuid",
          },
          {
            name: "tagCategoryId",
            type: "uuid",
          },
          {
            name: "createdAt",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updatedAt",
            type: "timestamp",
            default: "now()",
          },
        ],
        foreignKeys: [
          {
            columnNames: ["softwareId"],
            referencedColumnNames: ["id"],
            referencedTableName: "software",
            onDelete: "CASCADE",
          },
          {
            columnNames: ["tagCategoryId"],
            referencedColumnNames: ["id"],
            referencedTableName: "tag_category",
            onDelete: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("tag");
  }
}
