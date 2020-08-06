import { Note, Notes } from "./note";

interface Writer {
  create(item: Note): Promise<Note>;
  // update(id: string, item: Note): Promise<Note>;
  // delete(id: string): Promise<boolean>;
}

interface Reader {
  findAll(): Promise<Note[]>;
  findOne(id: string): Promise<Note>;
  findByTag(tag: string): Promise<Note[]>;
  findAllTags(): Promise<string[]>;
}

export interface IRepository extends Reader, Writer {}
