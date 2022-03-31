import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Tag, User } from "Database/entities";

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
  @JoinColumn({ name: "createdBy" })
  createdBy: string;

  @ManyToOne((type) => User)
  user: User;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}
