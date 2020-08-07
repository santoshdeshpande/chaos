import { UserRepository } from "./repo";
import { getRepository } from "typeorm";
import { UserDTO } from "./service";
import { User } from "./user";

export class DBRepository implements UserRepository {
  async create(user: UserDTO): Promise<User> {
    const repository = getRepository(User);
    let newUser = {
      name: user.name,
      password: user.password,
      email: user.email,
    };
    return repository.save(newUser);
  }
  async findByEmail(email: string): Promise<User | undefined> {
    const repository = getRepository(User);
    return repository.findOne({ email });
  }
}
