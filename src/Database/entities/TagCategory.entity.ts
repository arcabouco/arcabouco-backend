import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Tag } from "Database/entities";

@Entity()
export class TagCategory {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description?: string;

  @Column()
  isMultiTag: boolean;

  @OneToMany((type) => Tag, (tag) => tag.tagCategory)
  tags: Tag[];

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}

export type TagCategoryMin = Omit<TagCategory, "tags">;
