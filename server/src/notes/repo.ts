import { Note, Notes } from "./note";

interface Writer {
  create(item: Note): Promise<Note>;
  // update(id: string, item: Note): Promise<Note>;
  // delete(id: string): Promise<boolean>;
}

interface Reader {
  findAll(userId: string): Promise<Note[]>;
  findOne(userId: string, id: string): Promise<Note | undefined>;
  findByTag(userId: string, tag: string): Promise<Note[]>;
  findAllTags(userId: string): Promise<string[]>;
}

export interface IRepository extends Reader, Writer {}
