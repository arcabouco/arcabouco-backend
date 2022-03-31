import { Response } from "express";
import { E } from "Util";
import * as SoftwareUsecase from "Domain/Software/Usecase";
import { Software } from "Database/entities";

type CreateDTO = {
  software: Software;
};

export const create = async (
  request: E.RequestBody<CreateDTO>,
  response: Response
) => {
  if (!request.auth) throw new Error("Not authenticated");

  const { userId } = request.auth;

  const { description, link, name } = request.body.software;

  const createdSoftware = await SoftwareUsecase.createSoftware({
    software: {
      description,
      link,
      name,
    },
    userId,
  });

  //TODO: presentation layer

  return response.status(201).json({ software: createdSoftware });
};
