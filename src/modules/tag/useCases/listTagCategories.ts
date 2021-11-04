import { getCustomRepository } from "typeorm";
import { TagCategoryRepository } from "../repositories/TagCategory";

export const listTagCategories = async () => {
  const tagCategoryRepository = getCustomRepository(TagCategoryRepository);

  const tagCategories = await tagCategoryRepository.fetchAll({});

  return tagCategories;
};
