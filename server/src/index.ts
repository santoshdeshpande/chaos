import * as dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import express from "express";

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

const server = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
