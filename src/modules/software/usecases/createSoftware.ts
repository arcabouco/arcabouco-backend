import { getCustomRepository } from "typeorm";
import { Software } from "../../../entities/Software";
import { SoftwareRepository } from "../repository/repository";

export const createSoftware = async (
  software: Omit<Software, "id">
): Promise<Software> => {
  const repository = getCustomRepository(SoftwareRepository);

  return await repository.createAndSave(software);
};
