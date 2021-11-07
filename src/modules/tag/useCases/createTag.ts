import { getCustomRepository } from "typeorm";
import { TagRepository } from "../repositories/Tag";

type CreateTagDTO = {
  name: string;
  categoryId: string;
  softwareId: string;
};

export const createTag = async (input: CreateTagDTO) => {
  const tagRepository = getCustomRepository(TagRepository);

  const { categoryId, name, softwareId } = input;

  const tagAlreadyExists = await tagRepository.findByName(name);
  if (tagAlreadyExists) throw new Error("Tag already exists");

  const softwareTags = await tagRepository.softwareTags({
    softwareId,
    categoryId,
  });

  const isNotMulti = !softwareTags?.[0]?.tagCategory?.isMultiTag;
  if (isNotMulti && softwareTags.length) throw new Error("Tag limit");

  const tag = await tagRepository.createAndSave({
    categoryId,
    name,
    softwareId,
  });

  return tag;
};
