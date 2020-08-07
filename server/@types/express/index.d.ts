import { User } from "../../src/account/user";

declare global {
  namespace Express {
    interface Request {
      currentUser: User | undefined;
    }
  }
}
