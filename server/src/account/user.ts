import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("text")
  name: string;

  @Column({ type: "text", unique: true })
  email: string;

  @Column("text")
  password: string;
}

export interface Users {
  [key: string]: User;
}
