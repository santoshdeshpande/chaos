import { IRepository } from "./repo";
import { Note } from "./note";

export class NotesService {
  private readonly repo: IRepository;

  constructor(repo: IRepository) {
    this.repo = repo;
  }

  async findAll(userId: string): Promise<Note[]> {
    return this.repo.findAll(userId);
  }

  async findOne(userId: string, id: string): Promise<Note> {
    return this.repo.findOne(userId, id);
  }

  async findByTag(userId: string, tag: string): Promise<Note[]> {
    return this.repo.findByTag(userId, tag);
  }

  async createNote(note: Note): Promise<Note> {
    return this.repo.create(note);
  }

  async findAllTags(userId: string): Promise<string[]> {
    return this.repo.findAllTags(userId);
  }
}
