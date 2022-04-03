import handlebars from "handlebars";

import fs from "fs";
import path from "path";
import { pipe } from "fp-ts/function";
import * as AwsSes from "../../AwsSes";

type RecoveryTemplate = {
  recoveryUrl: string;
  email: string;
};

const signupTemplate = pipe(
  path.resolve(__dirname, "recoveryTemplate.hbs"),
  (path) => fs.readFileSync(path, "utf8").toString(),
  (templateText) => handlebars.compile<RecoveryTemplate>(templateText)
);

export const sendRecovery = (data: RecoveryTemplate) => {
  const html = signupTemplate(data);
  const subject = "Recuperar senha - Arcabouço";

  return AwsSes.sendEmail({ html, subject, to: [data.email] });
};
