export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

export interface Users {
  [key: string]: User;
}