import { getCustomRepository } from "typeorm";
import { SoftwareRepository } from "../Repository/SoftwareRepository";

type listSoftwaresDTO = {
  tags?: string[];
};

export const listSoftwares = async (input: listSoftwaresDTO) => {
  const { tags } = input;

  const softwareRepository = getCustomRepository(SoftwareRepository);

  const softwares = await softwareRepository.findAll({ tags });

  return softwares;
};
