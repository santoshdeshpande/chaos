import { User } from "./user";
import { UserDTO } from "./service";

interface Writer {
  create(user: UserDTO): Promise<User>;
  findByEmail(email: string): Promise<User | undefined>;
}

export interface UserRepository extends Writer {}
