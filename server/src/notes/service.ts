import { IRepository } from "./repo";
import { Note } from "./note";

export interface NoteDTO {
  id: string;
  note: string;
  tags: string[];
  userId: string;
}

export class NotesService {
  private readonly repo: IRepository;

  constructor(repo: IRepository) {
    this.repo = repo;
  }

  async findAll(userId: string): Promise<Note[]> {
    return this.repo.findAll(userId);
  }

  async findOne(userId: string, id: string): Promise<Note | undefined> {
    return this.repo.findOne(userId, id);
  }

  async findByTag(userId: string, tag: string): Promise<Note[]> {
    return this.repo.findByTag(userId, tag);
  }

  async createNote(note: Note): Promise<Note> {
    const newNote: Note = await this.repo.create(note);
    delete note.user;
    return newNote;
  }

  async findAllTags(userId: string): Promise<string[]> {
    return this.repo.findAllTags(userId);
  }

  convertToDTO(note: Note): NoteDTO {
    return {
      id: note.id,
      note: note.note,
      tags: note.tags,
      userId: note.user.id,
    };
  }
}
