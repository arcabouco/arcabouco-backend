import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Software } from "./Software";
import { TagCategory } from "./TagCategory";

@Entity()
export class Tag {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  softwareId: string;

  @ManyToOne((type) => Software, (software) => software.tags)
  software: Software;

  @Column()
  tagCategoryId: string;

  @ManyToOne((type) => TagCategory, (category) => category.tags)
  tagCategory: TagCategory;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
