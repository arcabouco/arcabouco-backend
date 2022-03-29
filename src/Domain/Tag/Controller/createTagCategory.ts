import { Response } from "express";
import { RequestBody } from "Util/RequestBody";
import * as TagUsecase from "Domain/Tag/Usecase";

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

  const createdTagCategory = await TagUsecase.createTagCategory(tagCategory);

  return response.status(201).json(createdTagCategory);
};
