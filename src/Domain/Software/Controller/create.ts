import { Response } from "express";
import { RequestBody } from "Util/RequestBody";
import * as SoftwareUsecase from "Domain/Software/Usecase";

type SoftwareInput = { description: string; link: string; name: string };

export const create = async (
  request: RequestBody<SoftwareInput>,
  response: Response
) => {
  const { description, link, name } = request.body;

  const software: SoftwareInput = { description, link, name };

  //TODO: validation layer

  const createdSoftware = await SoftwareUsecase.createSoftware(software);

  //TODO: presentation layer

  return response.status(201).json(createdSoftware);
};
