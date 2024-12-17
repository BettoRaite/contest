export interface User {
  id: number;
  name: string;
  login: string;
  password: string;
  photo?: string;
  role: string;
}

export const users: User[] = [];
