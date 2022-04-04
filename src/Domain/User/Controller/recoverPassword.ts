import { Response } from "express";
import { E } from "Util";

import * as yup from "yup";
import * as UserUsecase from "Domain/User/Usecase";

const recoverBodySchema = yup.object({
  password: yup.string().required(),
  token: yup.string().required(),
  id: yup.string().uuid().required(),
});

type RecoverBody = yup.InferType<typeof recoverBodySchema>;

export const recoverPassword = async (
  request: E.RequestBody<RecoverBody>,
  response: Response
) => {
  const { id, password, token } = recoverBodySchema.validateSync(request.body);

  await UserUsecase.recoverPassword({
    newPassword: password,
    token,
    userId: id,
  });

  return response.status(200).send();
};
