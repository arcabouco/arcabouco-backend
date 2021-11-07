import { Request, Response } from "express";
import { SoftwareUsecases } from "../usecases";

export const list = async (
  request: Request<{ tags: string[] }>,
  response: Response
) => {
  const { tags } = request.params;

  const softwares = await SoftwareUsecases.listSoftwares({ tags });

  return response.json(softwares);
};
