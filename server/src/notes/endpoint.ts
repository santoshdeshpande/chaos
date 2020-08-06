import express, { Request, Response } from "express";
import { NotesService } from "./service";
import { InMemRepository } from "./repo";
import { Note } from "./note";

export const notesRouter = express.Router();

const repo = new InMemRepository();
const service = new NotesService(repo);

notesRouter.get("/", async (req: Request, res: Response) => {
  try {
    const notes: Note[] = await service.findAll();
    res.status(200).send(notes);
  } catch (e) {
    res.status(404).send(e.message);
  }
});

notesRouter.get("/tags", async (req: Request, res: Response) => {
  try {
    const tags: string[] = await service.findAllTags();
    res.status(200).send(tags);
  } catch (e) {
    res.status(404).send(e.message);
  }
});

notesRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const note: Note = await service.findOne(req.params.id);
    res.status(200).send(note);
  } catch (e) {
    res.status(404).send(e.message);
  }
});

notesRouter.get("/search/:tag", async (req: Request, res: Response) => {
  try {
    const notes: Note[] = await service.findByTag(req.params.tag);
    res.status(200).send(notes);
  } catch (e) {
    res.status(404).send(e.message);
  }
});

notesRouter.post("/", async (req: Request, res: Response) => {
  try {
    const note: Note = req.body.note;
    const createdNote: Note = await service.createNote(note);
    res.status(201).send(createdNote);
  } catch (e) {
    res.status(404).send(e.message);
  }
});
