import { InMemUserRepository } from "./inmem-repo";
import { UserService } from "./service";
import { User } from "./user";

export const createService = () => {
  const repo = new InMemUserRepository();
  const service = new UserService(repo);
  return service;
};
