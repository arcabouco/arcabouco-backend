import { Response } from "express";
import { E } from "Util";
import * as yup from "yup";
import * as UserUsecase from "Domain/User/Usecase";

const requestRecoveryBodySchema = yup.object({
  email: yup.string().email().required(),
});

type RequestRecoveryBody = yup.InferType<typeof requestRecoveryBodySchema>;

export const requestRecovery = async (
  request: E.RequestBody<RequestRecoveryBody>,
  response: Response
) => {
  const { email } = requestRecoveryBodySchema.validateSync(request.body);

  yup.string().email().validateSync(email);

  await UserUsecase.requestRecovery({ email });

  return response.status(200).send();
};
