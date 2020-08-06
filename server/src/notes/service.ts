import { IRepository } from "./repo";
import { Note } from "./note";

export class NotesService {
  private readonly repo: IRepository;

  constructor(repo: IRepository) {
    this.repo = repo;
  }

  async findAll(): Promise<Note[]> {
    return this.repo.findAll();
  }

  async findOne(id: string): Promise<Note> {
    return this.repo.findOne(id);
  }

  async findByTag(tag: string): Promise<Note[]> {
    return this.repo.findByTag(tag);
  }

  async createNote(note: Note): Promise<Note> {
    return this.repo.create(note);
  }

  async findAllTags(): Promise<string[]> {
    return this.repo.findAllTags();
  }
}
