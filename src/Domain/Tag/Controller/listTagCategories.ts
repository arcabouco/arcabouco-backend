import { Request, Response } from "express";
import * as TagUsecase from "Domain/Tag/Usecase";

export const listTagCategories = async (
  request: Request,
  response: Response
) => {
  const tagCategories = await TagUsecase.listTagCategories();

  return response.json({ tagCategories });
};
