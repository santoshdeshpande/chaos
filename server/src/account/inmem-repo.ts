import { getRepository } from "typeorm";

import { Users, User } from "./user";
import { UserRepository } from "./repo";
import { UserDTO } from "./service";

const users: Users = {};

export class InMemUserRepository implements UserRepository {
  async create(user: UserDTO): Promise<User> {
    const id = `${new Date().valueOf()}`;
    delete user.confirmPassword;
    const newUser: User = {
      ...user,
      id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    users[id] = newUser;
    return newUser;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const allUsers = Object.values(users);
    return allUsers.find((user) => user.email === email);
  }
}
