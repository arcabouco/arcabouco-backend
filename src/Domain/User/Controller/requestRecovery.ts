import { Response } from "express";
import { E } from "Util";
import * as yup from "yup";
import * as UserUsecase from "Domain/User/Usecase";

export const requestRecovery = async (
  request: E.RequestBody<{ email: string }>,
  response: Response
) => {
  const { email } = request.body;

  yup.string().email().validateSync(email);

  await UserUsecase.requestRecovery({ email });

  return response.status(200).send();
};
