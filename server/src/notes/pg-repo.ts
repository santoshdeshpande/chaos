import { IRepository } from "./repo";
import { Note } from "./note";
import { getRepository } from "typeorm";

export class NoteRepository implements IRepository {
  async findAll(userId: string): Promise<Note[]> {
    return getRepository(Note)
      .createQueryBuilder("note")
      .where("note.user.id = :userId", { userId })
      .getMany();
  }
  async findOne(userId: string, id: string): Promise<Note | undefined> {
    return getRepository(Note)
      .createQueryBuilder("note")
      .where("id = :id AND note.user.id = :userId", { id, userId })
      .getOne();
  }
  async findByTag(userId: string, tag: string): Promise<Note[]> {
    return getRepository(Note)
      .createQueryBuilder("note")
      .where(":tag = any(tags) AND note.user.id = :userId", { tag, userId })
      .getMany();
  }
  async findAllTags(userId: string): Promise<string[]> {
    const qb = getRepository(Note).createQueryBuilder("note");
    const tags = await qb
      .select("distinct(unnest(tags))", "tags")
      .where("note.user.id = :userId", { userId })
      .orderBy("tags")
      .getRawMany();
    return tags.map((t) => t.tags);
  }

  async create(note: Note): Promise<Note> {
    const repository = getRepository(Note);
    return repository.save(note);
  }
}
