import { Response } from "express";
import { Software } from "../../../database/entities/Software";
import { RequestBody } from "../../../utils/RequestBody";
import { SoftwareUsecases } from "../usecases";

type SoftwareInput = { description: string; link: string; name: string };

export const create = async (
  request: RequestBody<SoftwareInput>,
  response: Response
) => {
  const { description, link, name } = request.body;

  const software: SoftwareInput = { description, link, name };

  //TODO: validation layer

  const createdSoftware = await SoftwareUsecases.createSoftware(software);

  //TODO: presentation layer

  return response.status(201).json(createdSoftware);
};
