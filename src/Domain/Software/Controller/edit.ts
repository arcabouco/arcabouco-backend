import { Response } from "express";
import { E } from "Util";
import * as Yup from "yup";
import * as SoftwareUsecase from "Domain/Software/Usecase";

type EditSoftwareBody = {
  software: {
    id: string;
    description: string;
    name: string;
    link: string;
  };
};

const editSoftwareBodySchema = Yup.object({
  software: Yup.object({
    id: Yup.string().uuid().required(),
    description: Yup.string().required(),
    name: Yup.string().required(),
    link: Yup.string().url().required(),
  }),
});

export const edit = async (
  request: E.RequestBody<EditSoftwareBody>,
  response: Response
) => {
  if (!request.auth) throw new Error("Not authenticated");

  const { software } = editSoftwareBodySchema.validateSync(request.body);

  const updatedSoftware = await SoftwareUsecase.editSoftware({
    actorId: request.auth.userId,
    actorRole: request.auth.role,
    softwareUpdates: software,
  });

  return response.json({ software: updatedSoftware });
};
