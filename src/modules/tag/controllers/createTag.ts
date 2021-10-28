import { Request, Response } from "express";
import { TagUseCases } from "../useCases";

type Body = {
  name: string;
};

type Param = {
  softwareId: string;
  categoryId: string;
};

export const createTag = async (
  request: Request<Param, {}, Body>,
  response: Response
) => {
  const { softwareId, categoryId } = request.params;
  const { name } = request.body;

  const tag = await TagUseCases.createTag({
    categoryId,
    name,
    softwareId,
  });

  return response.json(tag);
};
