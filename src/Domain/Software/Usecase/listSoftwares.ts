import { getCustomRepository } from "typeorm";
import * as SoftwareRepository from "../Repository/SoftwareRepository";

export const listSoftwares = async (input: { tags?: string[] }) => {
  const { tags } = input;

  const softwares = await SoftwareRepository.findAll({ tags });

  return softwares;
};
