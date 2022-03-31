import * as TagRepository from "Domain/Tag/Repository";
import { v4 } from "uuid";

export const createTagCategory = async (input: {
  name: string;
  description: string;
  isMultiTag: boolean;
}) => {
  const nameAlreadyExists = await TagRepository.findCategoryByName(input.name);

  if (nameAlreadyExists) throw new Error("Tag category already exists");

  const createdTagCategory = TagRepository.createCategory({
    id: v4(),
    isMultiTag: input.isMultiTag,
    name: input.name,
  });

  return createdTagCategory;
};
