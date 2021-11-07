import { getCustomRepository } from "typeorm";
import { SoftwareRepository } from "../repositories/SoftwareRepository";

type GetSoftwareDTO = {
  softwareId: string;
};

export const getSoftware = async ({ softwareId }: GetSoftwareDTO) => {
  const softwareRepository = getCustomRepository(SoftwareRepository);

  const software = await softwareRepository.fetchOne({ id: softwareId });

  return software;
};
