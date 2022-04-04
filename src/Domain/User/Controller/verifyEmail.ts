import { Request, Response } from "express";
import * as UserUsecase from "Domain/User/Usecase";
import * as Yup from "yup";

const VerifyEmailParamSchema = Yup.object({
  email: Yup.string().required(),
});

type VerifyEmailParam = Yup.InferType<typeof VerifyEmailParamSchema>;

export const verifyEmail = async (
  request: Request<VerifyEmailParam>,
  response: Response
) => {
  const { email } = VerifyEmailParamSchema.validateSync(request.params);

  const { isAvailable } = await UserUsecase.verifyEmail({ email });

  return response.json({ isAvailable });
};
