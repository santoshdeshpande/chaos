import * as dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import express from "express";
import { notesRouter } from "./notes/endpoint";
import { errorHandler } from "./middleware/error";
import { notFoundHandler } from "./middleware/not-found";

dotenv.config();

if (!process.env.PORT) {
  console.log("Could not find port variable.");
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use("/notes", notesRouter);

app.use(errorHandler);
app.use(notFoundHandler);

const server = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
