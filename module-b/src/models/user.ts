import { Multer } from "multer";
export interface User {
  id: number;
  name: string;
  login: string;
  password: string;
  photo?: unknown;
  roleId: number;
}

export const roleIdMapping = {
  1: "admin",
  2: "manager",
  3: "master",
};
export const users = new Map<string, User>();
