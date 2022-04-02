import { Response } from "express";
import { E } from "Util";
import * as TagUsecase from "Domain/Tag/Usecase";

type TagCategoryInput = {
  name: string;
  description: string;
  isMultiTag: boolean;
};

export const createTagCategory = async (
  request: E.RequestBody<TagCategoryInput>,
  response: Response
) => {
  if (!request.auth) throw new Error("Not authenticated");

  const createdTagCategory = await TagUsecase.createTagCategory({
    description: request.body.description,
    isMultiTag: request.body.isMultiTag,
    name: request.body.name,
  });

  return response.status(201).json({ tagCategory: createdTagCategory });
};
