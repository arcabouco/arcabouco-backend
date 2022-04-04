import { Request, Response } from "express";
import * as TagUsecase from "Domain/Tag/Usecase";
import { E } from "Util";
import * as Yup from "yup";

const addTagBodySchema = Yup.object({
  name: Yup.string().required(),
  softwareId: Yup.string().uuid().required(),
  categoryId: Yup.string().uuid().required(),
});

type CreateTagBody = Yup.InferType<typeof addTagBodySchema>;

export const addTag = async (
  request: E.RequestBody<CreateTagBody>,
  response: Response
) => {
  const { name, categoryId, softwareId } = addTagBodySchema.validateSync(
    request.body
  );

  const tag = await TagUsecase.addTag({
    categoryId,
    tagName: name,
    softwareId,
  });

  return response.json({ tag });
};
