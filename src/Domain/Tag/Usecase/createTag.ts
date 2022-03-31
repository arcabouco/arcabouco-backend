import * as TagRepository from "Domain/Tag/Repository";

import * as SoftwareRepository from "Domain/Software/Repository";
import { v4 } from "uuid";

type CreateTagDTO = {
  tagName: string;
  categoryId: string;
  softwareId: string;
};

export const createTag = async (input: CreateTagDTO) => {
  const { categoryId, softwareId, tagName } = input;

  const softwareTags = await TagRepository.bySoftware({
    softwareId,
    categoryId,
  });

  const isNotMulti = !softwareTags?.[0]?.tagCategory?.isMultiTag;
  if (isNotMulti && softwareTags.length) throw new Error("Tag limit");

  const tag = await getOrCreateTag({ categoryId, tagName });

  await SoftwareRepository.addTags({ softwareId, tags: [tag] });

  return tag;
};

const getOrCreateTag = async (input: {
  tagName: string;
  categoryId: string;
}) => {
  const { categoryId, tagName } = input;

  const existingTag = await TagRepository.findByName({ categoryId, tagName });

  if (existingTag) return existingTag;

  const newTag = await TagRepository.createTag({
    id: v4(),
    name: tagName,
    tagCategoryId: categoryId,
  });

  return newTag;
};
