import { IRepository } from "./repo";
import { Note, Notes } from "./note";

const notes: Notes = {
  "1": {
    id: 1,
    note: "This is first test note",
    tags: ["software", "default"],
    userId: "1",
  },
  "2": {
    id: 2,
    note: "This is second test note",
    tags: ["software", "default", "another"],
    userId: "1",
  },
  "3": {
    id: 3,
    note: "This is third test note",
    tags: ["software", "third", "another"],
    userId: "1",
  },
  "4": {
    id: 4,
    note: "This is the fourth test note",
    tags: ["hacker", "brother", "hardware", "test"],
    userId: "1",
  },
  "5": {
    id: 5,
    note: "This note has no tags",
    tags: [],
    userId: "1",
  },
};

export class InMemRepository implements IRepository {
  async findAll(userId: string): Promise<Note[]> {
    return Object.values(notes).filter((note) => note.userId === userId);
  }

  async findOne(userId: string, id: string): Promise<Note> {
    const note = notes[id];
    if (note && note.userId === userId) {
      return note;
    }
    throw new Error("No record found");
  }

  async findByTag(userId: string, tag: string): Promise<Note[]> {
    const allNotes = Object.values(notes);
    return allNotes.filter((note) => {
      return note.tags.includes(tag) && note.userId === userId;
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
    const id = new Date().valueOf();
    const newNote: Note = {
      ...note,
      id,
    };
    notes[`${id}`] = newNote;
    return newNote;
  }
}
