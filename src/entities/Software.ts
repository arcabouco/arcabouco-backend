import { Column, Entity, Generated, PrimaryColumn } from "typeorm";

@Entity()
export class Software {
  @Column()
  @PrimaryColumn()
  @Generated("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  link: string;
}
