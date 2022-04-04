import { Request, Response } from "express";
import * as SoftwareUsecase from "Domain/Software/Usecase";
import * as Yup from "yup";
import { E } from "Util";

const listSoftwareBodySchema = Yup.object({
  tags: Yup.array().of(Yup.string().uuid().required()),
});

type ListSoftwareBody = Yup.InferType<typeof listSoftwareBodySchema>;

export const list = async (
  request: E.RequestBody<ListSoftwareBody>,
  response: Response
) => {
  const { tags } = listSoftwareBodySchema.validateSync(request.body);

  const softwares = await SoftwareUsecase.listSoftwares({ tags });

  return response.json({ softwares });
};
