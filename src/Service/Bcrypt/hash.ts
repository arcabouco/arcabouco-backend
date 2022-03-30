import bcrypt from "bcrypt";

export const hash = (plainText: string) => {
  const saltRounds = 10;

  const hash = bcrypt.hashSync(plainText, saltRounds);

  return hash;
};
