import {
  AfterLoad,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Software } from "Database/entities";
import { getUrl } from "Service/S3";

@Entity()
export class SoftwareImage {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  softwareId: string;

  @ManyToOne((type) => Software, (Software) => Software.images, {
    onDelete: "CASCADE",
  })
  software: Software;

  @Column()
  extension: string;

  @Column({ type: "int" })
  width: number;

  @Column({ type: "int" })
  height: number;

  @Column({ type: "int" })
  size: number;

  url: string;

  @AfterLoad()
  loadUrl?: () => Promise<void> = async () => {
    this.url = await getUrl(
      `software/${this.softwareId}/image/${this.id}.${this.extension}`
    );
  };
}

export type SoftwareImageMin = Omit<SoftwareImage, "software" | "url">;
