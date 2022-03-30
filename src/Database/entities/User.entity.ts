import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

const userRoles = ["USER", "EVALUATOR", "ADMIN"] as const;

type UserRole = typeof userRoles[number];

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true, type: "varchar" })
  signupToken?: string | null;

  @Column({ nullable: true, type: "varchar" })
  recoveryToken?: string | null;

  @Column({ type: "enum", enum: userRoles })
  role: UserRole;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
