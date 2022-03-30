import { User } from "Database/entities";

export type AuthPayload = {
  userId: string;
  email: string;
  role: User["role"];
};
