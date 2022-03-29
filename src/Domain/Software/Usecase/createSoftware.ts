import { getCustomRepository } from "typeorm";
import { Software } from "Database/entities";
import { SoftwareRepository } from "Domain/Software/Repository";

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
