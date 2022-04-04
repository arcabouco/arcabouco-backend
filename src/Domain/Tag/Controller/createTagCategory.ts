import { Response } from "express";
import { E } from "Util";
import * as TagUsecase from "Domain/Tag/Usecase";
import * as Yup from "yup";

const createTagCategoryBodySchema = Yup.object({
  name: Yup.string().required(),
  description: Yup.string().required(),
  isMultiTag: Yup.boolean().required(),
});

type CreateTagCategoryBody = Yup.InferType<typeof createTagCategoryBodySchema>;

export const createTagCategory = async (
  request: E.RequestBody<CreateTagCategoryBody>,
  response: Response
) => {
  if (!request.auth) throw new Error("Not authenticated");

  const { description, isMultiTag, name } =
    createTagCategoryBodySchema.validateSync(request.body);

  const createdTagCategory = await TagUsecase.createTagCategory({
    description,
    isMultiTag,
    name,
  });

  return response.status(201).json({ tagCategory: createdTagCategory });
};
