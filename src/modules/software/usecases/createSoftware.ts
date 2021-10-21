import { getCustomRepository } from "typeorm";
import { Software } from "../../../database/entities/Software";
import { SoftwareRepository } from "../repositories/SoftwareRepository";

type CreateSoftwareDTO = {
  name: string;
  description: string;
  link: string;
};

export const createSoftware = async (
  software: CreateSoftwareDTO
): Promise<Software> => {
  const repository = getCustomRepository(SoftwareRepository);

  return await repository.createAndSave(software);
};
