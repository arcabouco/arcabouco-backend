import * as TagRepository from "Domain/Tag/Repository";

export const listTagCategories = async () => {
  const tagCategories = await TagRepository.findCategory({});

  return tagCategories;
};
