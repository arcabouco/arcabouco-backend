import crypto from "crypto";
import { User } from "Domain";
import * as UserRepository from "Domain/User/Repository";
import { Email, Jwt } from "Service";
import queryString from "query-string";

export const requestRecovery = async (input: { email: string }) => {
  const user = await UserRepository.findOne({ where: { email: input.email } });

  if (!user) return;

  const recoveryToken = Jwt.sign<User.Type.RecoveryPayload>(
    {
      userId: user.id,
      recovery: true,
    },
    "2h"
  );

  const recoveryUrl = queryString.stringifyUrl({
    url: `https://arcabouco.org/app/recovery`,
    query: { token: recoveryToken, id: user.id },
  });

  Email.sendRecovery({ recoveryUrl, email: user.email });
};
