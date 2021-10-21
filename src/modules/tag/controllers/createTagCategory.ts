import { Response } from "express";
import { TagCategory } from "../../../database/entities/TagCategory";
import { RequestBody } from "../../../utils/RequestBody";
import { TagUseCases } from "../useCases";

type TagCategoryInput = {
  name: string;
  description: string;
  isMultiTag: boolean;
};

export const createTagCategory = async (
  request: RequestBody<TagCategoryInput>,
  response: Response
) => {
  const { description, isMultiTag, name } = request.body;

  const tagCategory: TagCategoryInput = { description, isMultiTag, name };

  const createdTagCategory = await TagUseCases.createTagCategory(tagCategory);

  return response.status(201).json(createdTagCategory);
};
