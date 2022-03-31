import { Response } from "express";
import { E } from "Util";
import * as SoftwareUsecase from "Domain/Software/Usecase";

type SoftwareInput = { description: string; link: string; name: string };

export const create = async (
  request: E.RequestBody<SoftwareInput>,
  response: Response
) => {
  const { body } = request;

  //TODO: validation layer

  const createdSoftware = await SoftwareUsecase.createSoftware({
    description: body.description,
    link: body.link,
    name: body.name,
    userId: request.auth.userId,
  });

  //TODO: presentation layer

  return response.status(201).json({ software: createdSoftware });
};
