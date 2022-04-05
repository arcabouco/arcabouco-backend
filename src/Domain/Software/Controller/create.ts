import { Response } from "express";
import { E } from "Util";
import * as SoftwareUsecase from "Domain/Software/Usecase";
import * as Yup from "yup";

const createSoftwareBodySchema = Yup.object({
  description: Yup.string().required(),
  link: Yup.string().url().required(),
  name: Yup.string().required(),
});

import * as R from "ramda";
import { pipe } from "fp-ts/lib/function";

type CreateSoftwareBody = Yup.InferType<typeof createSoftwareBodySchema>;

export const create = async (
  request: E.RequestBody<CreateSoftwareBody>,
  response: Response
) => {
  if (!request.auth) throw new Error("Not authenticated");

  const { userId } = request.auth;
  const software = createSoftwareBodySchema.validateSync(request.body);

  const files = request.files instanceof Array ? request.files : [];

  console.log(files)

  const createdSoftware = await SoftwareUsecase.createSoftware({
    software,
    userId,
    images: files.map((file) => ({
      data: file.buffer,
      extension: getExtension(file.originalname),
      size: file.size,
    })),
  });

  return response.status(201).json({ software: createdSoftware });
};

const getExtension = (filename: string) => {
  const [, extension] = filename.split(".");
  return extension;
};
