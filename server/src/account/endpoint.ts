import express, { Request, Response } from "express";
import { InMemUserRepository } from "./inmem-repo";
import { UserService, UserDTO, LoginDTO } from "./service";
import { User } from "./user";
import HttpException from "../common/http-exception";
import { createService } from "./service-factory";

export const userRouter = express.Router();

const service = createService();

userRouter.post("/register", async (req: Request, res: Response) => {
  try {
    const user: UserDTO = req.body.user;
    const newUser: User = await service.register(user);
    res
      .status(201)
      .send({ message: "User created successfully", email: newUser.email });
  } catch (e) {
    res.status(e.statusCode).send({ error: e.message });
  }
});

userRouter.post("/login", async (req: Request, res: Response) => {
  try {
    const creds: LoginDTO = req.body.credentials;
    const token = await service.login(creds);
    res.status(200).send(token);
  } catch (e) {
    res.status(e.statusCode).send({ error: e.message });
  }
});

//   try {
//     const note: Note = req.body.note;
//     const createdNote: Note = await service.createNote(note);
//     res.status(201).send(createdNote);
//   } catch (e) {
//     res.status(404).send(e.message);
//   }
