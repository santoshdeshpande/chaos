import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

import { User } from "./user";
import { UserRepository } from "./repo";
import HttpException from "../common/http-exception";

export interface UserDTO {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface Claims {
  id: string;
  email: string;
}

export class UserExistsException extends HttpException {
  constructor(email: string) {
    super(400, `User with email ${email} already exists`);
  }
}

class AuthenticationException extends HttpException {
  constructor() {
    super(401, `Invalid email/password`);
  }
}

function generateToken(claims: Claims): string {
  const expiresIn = process.env.TOKEN_EXPIRY_TIME;
  const secret = process.env.JWT_SECRET as string;
  return jwt.sign(claims, secret, { expiresIn });
}

export class UserService {
  repo: UserRepository;

  constructor(repo: UserRepository) {
    this.repo = repo;
  }

  async register(user: UserDTO): Promise<User> {
    const existingUser = await this.repo.findByEmail(user.email);
    if (user.password !== user.confirmPassword) {
      throw new HttpException(400, "Passwords do not match");
    }
    if (existingUser) {
      throw new UserExistsException(user.email);
    }
    const hashedPassword = await bcrypt.hash(user.password, 10);
    let newUser = {
      name: user.name,
      email: user.email,
      password: hashedPassword,
      id: user.email,
    };
    return this.repo.create(newUser);
  }

  async login(creds: LoginDTO): Promise<string> {
    const existingUser = await this.repo.findByEmail(creds.email);
    console.log("Existing user", existingUser);
    if (!existingUser) {
      throw new AuthenticationException();
    }
    const passwordMatches = await bcrypt.compare(
      creds.password,
      existingUser.password
    );
    if (passwordMatches) {
      const claims: Claims = {
        id: existingUser.id,
        email: existingUser.email,
      };
      return generateToken(claims);
    }
    throw new AuthenticationException();
  }

  async findUserByEmail(email: string): Promise<User | undefined> {
    return this.repo.findByEmail(email);
  }
}
