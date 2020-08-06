import { IRepository } from "./repo";
import { Note, Notes } from "./note";

const notes: Notes = {
  "1": {
    id: 1,
    note: "This is first test note",
    tags: ["software", "default"],
  },
  "2": {
    id: 2,
    note: "This is second test note",
    tags: ["software", "default", "another"],
  },
  "3": {
    id: 3,
    note: "This is third test note",
    tags: ["software", "third", "another"],
  },
  "4": {
    id: 4,
    note: "This is the fourth test note",
    tags: ["hacker", "brother", "hardware", "test"],
  },
  "5": {
    id: 5,
    note: "This note has no tags",
    tags: [],
  },
};

export class InMemRepository implements IRepository {
  async findAll(): Promise<Note[]> {
    return Object.values(notes);
  }

  async findOne(id: string): Promise<Note> {
    const note = notes[id];
    if (note) {
      return note;
    }
    throw new Error("No record found");
  }

  async findByTag(tag: string): Promise<Note[]> {
    const allNotes = Object.values(notes);
    return allNotes.filter((note) => {
      return note.tags.includes(tag);
    });
  }

  async findAllTags(): Promise<string[]> {
    const allNotes = Object.values(notes);
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
