import bcrypt from "bcrypt";

export const compare = (input: { plainText: string; hash: string }) =>
  bcrypt.compareSync(input.plainText, input.hash);
