import { getCustomRepository } from "typeorm";
import * as SoftwareRepository from "Domain/Software/Repository";
import * as TagRepository from "Domain/Tag/Repository";

type GetSoftwareDTO = {
  softwareId: string;
};

export const getSoftware = async ({ softwareId }: GetSoftwareDTO) => {
  const software = SoftwareRepository.findOne({ id: softwareId });
  const categories = TagRepository.findCategoryBySoftware({ id: softwareId });

  return { software: await software, categories: await categories };
};
