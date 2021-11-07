import { Request, Response } from "express";
import { SoftwareUsecases } from "../usecases";

export const get = async (
  request: Request<{ softwareId: string }>,
  response: Response
) => {
  const { softwareId } = request.params;

  const software = await SoftwareUsecases.getSoftware({ softwareId });

  return response.json(software);
};
