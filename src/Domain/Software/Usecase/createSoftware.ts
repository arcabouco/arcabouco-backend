import { Software } from "Database/entities";
import * as SoftwareRepository from "Domain/Software/Repository";
import { v4 } from "uuid";

export const createSoftware = (input: {
  userId: string;
  software: Omit<Software, "tags" | "user" | "createdBy" | "id" | "status">;
}): Promise<Software> => {
  return SoftwareRepository.create({
    id: v4(),
    createdBy: input.userId,
    description: input.software.description,
    link: input.software.link,
    name: input.software.name,
    status: "analyzing",
    tags: [],
  });
};
