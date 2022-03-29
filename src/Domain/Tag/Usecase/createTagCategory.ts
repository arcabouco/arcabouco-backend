import { getCustomRepository } from "typeorm";
import { TagCategoryRepository } from "../Repository/TagCategory";

type CreateTagDTO = {
  name: string;
  description: string;
  isMultiTag: boolean;
};

export const createTagCategory = async (tagCategoryData: CreateTagDTO) => {
  const tagCategoryRepository = getCustomRepository(TagCategoryRepository);

  const nameAlreadyExists = await tagCategoryRepository.fetchByName(
    tagCategoryData.name
  );

  if (nameAlreadyExists) throw new Error("Tag category already exists");

  const createdTagCategory =
    tagCategoryRepository.createAndSave(tagCategoryData);

  return createdTagCategory;
};
