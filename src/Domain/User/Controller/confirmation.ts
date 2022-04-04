import { E } from "Util";
import * as UserUsecase from "Domain/User/Usecase";
import { Response } from "express";
import * as Yup from "yup";

const confirmationBodySchema = Yup.object({
  token: Yup.string().required(),
  userId: Yup.string().uuid().required(),
});

type ConfirmationBody = Yup.InferType<typeof confirmationBodySchema>;

export const confirmation = async (
  request: E.RequestBody<ConfirmationBody>,
  response: Response
) => {
  const { token, userId } = confirmationBodySchema.validateSync(request.body);

  const user = await UserUsecase.confirmation({ token, userId });

  return response.json({ user });
};
