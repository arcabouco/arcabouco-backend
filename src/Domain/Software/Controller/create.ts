import { Response } from "express";
import { E } from "Util";
import * as SoftwareUsecase from "Domain/Software/Usecase";
import { Software } from "Database/entities";
import * as Yup from "yup";
import { createWriteStream, writeFile, writeFileSync } from "fs";
import { pipeline } from "stream";

type CreateSoftwareBody = {
  software: {
    description: string;
    link: string;
    name: string;
  };
};

const createSoftwareBodySchema = Yup.object({
  description: Yup.string().required(),
  link: Yup.string().url().required(),
  name: Yup.string().required(),
});

export const create = async (
  request: E.RequestBody<CreateSoftwareBody>,
  response: Response
) => {
  if (!request.auth) throw new Error("Not authenticated");

  const { userId } = request.auth;
  const software = createSoftwareBodySchema.validateSync(request.body);

  const createdSoftware = await SoftwareUsecase.createSoftware({
    software,
    userId,
  });

  return response.status(201).json({ software: createdSoftware });
};
