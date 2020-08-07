import { IRepository } from "./repo";
import { Note, Notes } from "./note";

const defaultUser = {
  id: "1",
};
const notes: Notes = {};

export class InMemRepository implements IRepository {
  async findAll(userId: string): Promise<Note[]> {
    return Object.values(notes).filter((note) => note.user.id === userId);
  }

  async findOne(userId: string, id: string): Promise<Note | undefined> {
    const note = notes[id];
    if (note && note.user.id === userId) {
      return note;
    }
    throw new Error("No record found");
  }

  async findByTag(userId: string, tag: string): Promise<Note[]> {
    const allNotes = Object.values(notes);
    return allNotes.filter((note) => {
      return note.tags.includes(tag) && note.user.id === userId;
    });
  }

  async findAllTags(userId: string): Promise<string[]> {
    const allNotes = await this.findAll(userId);
    const tags = allNotes.reduce((acc: string[], note: Note) => {
      return [...acc, ...note.tags];
    }, []);
    return tags.filter((item, index) => {
      return tags.indexOf(item) === index;
    });
  }

  async create(note: Note): Promise<Note> {
    const id = `${new Date().valueOf()}`;
    const newNote: Note = {
      ...note,
      id,
    };
    notes[id] = newNote;
    return newNote;
  }
}
