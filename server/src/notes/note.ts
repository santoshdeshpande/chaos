import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "../account/user";

@Entity()
export class Note {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column()
  note: string;
  @Column("text", { array: true, default: "{}" })
  tags: string[];

  @Column({ nullable: true })
  userId: string;

  @Index()
  @ManyToOne((type) => User)
  user: User;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}

export interface Notes {
  [key: string]: Note;
}
