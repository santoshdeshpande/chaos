import express, { Request, Response } from "express";
import { NotesService } from "./service";
import { InMemRepository } from "./inmem-repo";
import { Note } from "./note";
import { authMiddleware } from "../middleware/verify";
import { User } from "../account/user";

export const notesRouter = express.Router();

const repo = new InMemRepository();
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
    const note: Note = await service.findOne(id, req.params.id);
    res.status(200).send(note);
  } catch (e) {
    res.status(404).send(e.message);
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
    const { id } = req.currentUser as User;
    note.userId = id;
    const createdNote: Note = await service.createNote(note);
    res.status(201).send(createdNote);
  } catch (e) {
    res.status(404).send(e.message);
  }
});
