import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Index,
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
}

export interface Notes {
  [key: string]: Note;
}
