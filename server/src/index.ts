import * as dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import express from "express";
import morgan from "morgan";

import { notesRouter } from "./notes/endpoint";
import { userRouter } from "./account/endpoint";
import { errorHandler } from "./middleware/error";
import { notFoundHandler } from "./middleware/not-found";
import { createConnection } from "typeorm";
import { Note } from "./notes/note";
import { User } from "./account/user";

dotenv.config();

if (!process.env.PORT) {
  console.log("Could not find port variable.");
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

morgan.token("pid", () => {
  return `${process.pid}`;
});

const app = express();
app.use(helmet());
app.use(cors());
app.use(
  morgan(
    ":pid :method :url :status :res[content-length] - :response-time ms :user-agent :date[iso]"
  )
);
app.use(express.json());
app.use("/notes", notesRouter);
app.use("/accounts", userRouter);

app.use(errorHandler);

app.use(notFoundHandler);

const { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE, DB_DEBUG } = process.env;
const logging = DB_DEBUG === "true";
const connection = createConnection({
  type: "postgres",
  host: DB_HOST,
  port: 5432,
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  synchronize: true,
  logging,
  entities: [User, Note],
}).then((connection) => {
  // console.log(connection);
});

const server = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
