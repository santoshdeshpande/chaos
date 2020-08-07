import { User } from "./user";

interface Writer {
  create(user: User): Promise<User>;
  findByEmail(email: string): Promise<User | undefined>;
}

export interface UserRepository extends Writer {}
