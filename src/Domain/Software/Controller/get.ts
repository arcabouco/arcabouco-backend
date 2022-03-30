import { Request, Response } from "express";
import * as SoftwareUsecase from "Domain/Software/Usecase";

export const get = async (
  request: Request<{ softwareId: string }>,
  response: Response
) => {
  const { softwareId } = request.params;

  const software = await SoftwareUsecase.getSoftware({ softwareId });

  return response.json({ software });
};
