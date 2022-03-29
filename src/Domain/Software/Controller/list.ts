import { Request, Response } from "express";
import * as SoftwareUsecase from "Domain/Software/Usecase";

export const list = async (
  request: Request<{ tags: string[] }>,
  response: Response
) => {
  const { tags } = request.params;

  const softwares = await SoftwareUsecase.listSoftwares({ tags });

  return response.json(softwares);
};
