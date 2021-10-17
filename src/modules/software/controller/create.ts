import { Response } from "express";
import { Software } from "../../../entities/Software";
import { RequestBody } from "../../../utils/RequestBody";
import { SoftwareUsecases } from "../usecases";

type SoftwareInput = Omit<Software, "id">;

export const create = async (
  request: RequestBody<SoftwareInput>,
  response: Response
) => {
  const software = request.body;

  //TODO: validation layer

  const createdSoftware = await SoftwareUsecases.createSoftware(software);

  //TODO: presentation layer

  return response.status(201).json(createdSoftware);
};
