import { getCustomRepository } from "typeorm";
import * as SoftwareRepository from "../Repository/SoftwareRepository";

type listSoftwaresDTO = {
  tags?: string[];
};

export const listSoftwares = async (input: listSoftwaresDTO) => {
  const { tags } = input;

  const softwares = await SoftwareRepository.findAll({ tags });

  return softwares;
};
