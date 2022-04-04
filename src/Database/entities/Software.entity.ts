import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Tag, User, SoftwareImage } from "Database/entities";

const softwareStatus = ["draft", "published", "analyzing"] as const;
type SoftwareStatus = typeof softwareStatus[number];

@Entity()
export class Software {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  link: string;

  @Column({ type: "enum", enum: softwareStatus })
  status: SoftwareStatus;

  @ManyToMany((type) => Tag, (Tag) => Tag.softwares)
  tags: Tag[];

  @Column()
  createdBy: string;

  @ManyToOne((type) => User)
  @JoinColumn({ name: "createdBy" })
  user: User;

  @OneToMany((type) => SoftwareImage, (SoftwareImage) => SoftwareImage.software)
  images: SoftwareImage[];

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}

export type SoftwareMin = Omit<Software, "tags" | "user" | "images">;
