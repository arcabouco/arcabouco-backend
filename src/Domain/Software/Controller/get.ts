import { Request, Response } from "express";
import * as SoftwareUsecase from "Domain/Software/Usecase";
import { validate } from "uuid";

export const get = async (
  request: Request<{ softwareId: string }>,
  response: Response
) => {
  const { softwareId } = request.params;

  if (!validate(softwareId)) throw new Error("Invalid software id");

  const { categories, software } = await SoftwareUsecase.getSoftware({
    softwareId,
  });

  return response.json({ software, categories });
};
