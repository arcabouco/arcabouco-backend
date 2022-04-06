import { Request, Response } from "express";
import * as SoftwareUsecase from "Domain/Software/Usecase";
import * as Yup from "yup";
import { E } from "Util";
import { pipe } from "fp-ts/lib/function";

type ListSoftwareQuery = {
  tags?: string | string[];
};

const listSoftwareTagsSchema = Yup.array().of(Yup.string().uuid().required());
export const list = async (
  request: Request<{}, {}, {}, ListSoftwareQuery>,
  response: Response
) => {
  const tags = pipe(
    request.query.tags,
    (tags) => (tags ? tags : []),
    (tags) => (Array.isArray(tags) ? tags : [tags])
  );

  listSoftwareTagsSchema.validateSync(tags);

  const softwares = await SoftwareUsecase.listSoftwares({ tags });

  return response.json({ softwares });
};
