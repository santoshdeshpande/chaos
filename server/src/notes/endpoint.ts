import express, { Request, Response } from "express";
import { NotesService, NoteDTO } from "./service";
import { InMemRepository } from "./inmem-repo";
import { Note } from "./note";
import { authMiddleware } from "../middleware/verify";
import { User } from "../account/user";
import { NoteRepository } from "./pg-repo";

export const notesRouter = express.Router();

const repo = new NoteRepository();
const service = new NotesService(repo);

notesRouter.use(authMiddleware);

notesRouter.get("/", async (req: Request, res: Response) => {
  try {
    const { id } = req.currentUser as User;
    const notes: Note[] = await service.findAll(id);
    res.status(200).send(notes);
  } catch (e) {
    res.status(404).send(e.message);
  }
});

notesRouter.get("/tags", async (req: Request, res: Response) => {
  try {
    const { id } = req.currentUser as User;
    const tags: string[] = await service.findAllTags(id);
    res.status(200).send(tags);
  } catch (e) {
    res.status(404).send(e.message);
  }
});

notesRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.currentUser as User;
    const note = await service.findOne(id, req.params.id);
    if (note) {
      res.status(200).send(note);
    } else {
      res.status(404).send({ message: `Could not find the note for id ${id}` });
    }
  } catch (e) {
    res.status(404).send({ message: e.message });
  }
});

notesRouter.get("/search/:tag", async (req: Request, res: Response) => {
  try {
    const { id } = req.currentUser as User;
    const notes: Note[] = await service.findByTag(id, req.params.tag);
    res.status(200).send(notes);
  } catch (e) {
    res.status(404).send(e.message);
  }
});

notesRouter.post("/", async (req: Request, res: Response) => {
  try {
    const note: Note = req.body.note;
    const user = req.currentUser as User;
    note.user = user;
    const createdNote: Note = await service.createNote(note);
    res.status(201).send(createdNote);
  } catch (e) {
    res.status(404).send(e.message);
  }
});
