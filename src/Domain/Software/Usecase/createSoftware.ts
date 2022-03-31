import { getCustomRepository } from "typeorm";
import { Software } from "Database/entities";
import * as SoftwareRepository from "Domain/Software/Repository";
import { v4 } from "uuid";

type CreateSoftwareDTO = {
  name: string;
  description: string;
  link: string;
  userId: string;
};

export const createSoftware = async (
  software: CreateSoftwareDTO
): Promise<Software> => {
  const { name, description, link, userId } = software;

  return await SoftwareRepository.create({
    id: v4(),
    createdBy: userId,
    name,
    description,
    link,
    status: "analyzing",
    tags: [],
  });
};
