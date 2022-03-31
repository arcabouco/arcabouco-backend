import { Request, Response } from "express";
import * as TagUsecase from "Domain/Tag/Usecase";
import { E } from "Util";

type createTagBody = {
  name: string;
  softwareId: string;
  categoryId: string;
};

export const createTag = async (
  request: E.RequestBody<createTagBody>,
  response: Response
) => {
  const { name, categoryId, softwareId } = request.body;

  const tag = await TagUsecase.createTag({
    categoryId,
    tagName: name,
    softwareId,
  });

  return response.json({ tag });
};
