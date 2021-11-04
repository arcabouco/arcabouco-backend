import { Request, Response } from "express";
import { TagUseCases } from "../useCases";

export const listTagCategories = async (
  request: Request,
  response: Response
) => {
  const tagCategories = await TagUseCases.listTagCategories();

  return response.json(tagCategories);
};
