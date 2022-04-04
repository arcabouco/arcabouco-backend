import { SoftwareMin, User } from "Database/entities";

export const toEdit = (input: {
  software: SoftwareMin;
  actorId: string;
  actorRole: string;
}): boolean => {
  if (input.actorRole === "ADMIN") return true;
  if (input.software.createdBy === input.actorId) return true;
  return false;
};
