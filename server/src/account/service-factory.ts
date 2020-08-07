import { InMemUserRepository } from "./inmem-repo";
import { UserService } from "./service";
import { User } from "./user";
import { DBRepository } from "./pg-repo";

export const createService = () => {
  const repo = new DBRepository();
  const service = new UserService(repo);
  return service;
};
