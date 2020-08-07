import { Users, User } from "./user";
import { UserRepository } from "./repo";

const users: Users = {
  "1": {
    id: "1",
    name: "Santosh Suresh",
    email: "santoshdeshpande@gmail.com",
    password: "pass123",
  },
};

export class InMemUserRepository implements UserRepository {
  async create(user: User): Promise<User> {
    const id = `${new Date().valueOf()}`;
    const newUser: User = {
      ...user,
      id,
    };
    users[id] = newUser;
    return newUser;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const allUsers = Object.values(users);
    return allUsers.find((user) => user.email === email);
  }
}
