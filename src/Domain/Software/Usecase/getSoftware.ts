import { getCustomRepository } from "typeorm";
import * as SoftwareRepository from "Domain/Software/Repository";

type GetSoftwareDTO = {
  softwareId: string;
};

export const getSoftware = async ({ softwareId }: GetSoftwareDTO) => {
  const software = await SoftwareRepository.findOne({ id: softwareId });

  return software;
};
