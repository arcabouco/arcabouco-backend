import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
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

  @ManyToMany((type) => Software, (Software) => Software.tags)
  @JoinTable()
  softwares: Software[];

  @Column()
  tagCategoryId: string;

  @ManyToOne((type) => TagCategory, (category) => category.tags)
  @JoinColumn()
  tagCategory: TagCategory;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
