import { Response } from "express";
import { E } from "Util";

import * as yup from "yup";
import * as UserUsecase from "Domain/User/Usecase";

type UpdatePasswordBody = {
  password: string;
  token: string;
  id: string;
};

const bodySchema = yup.object({
  password: yup.string().required(),
  token: yup.string().required(),
  id: yup.string().uuid().required(),
});

export const recoverPassword = async (
  request: E.RequestBody<UpdatePasswordBody>,
  response: Response
) => {
  const { id, password, token } = bodySchema.validateSync(request.body);

  await UserUsecase.recoverPassword({
    newPassword: password,
    token,
    userId: id,
  });

  return response.status(200).send();
};
