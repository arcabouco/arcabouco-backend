import { createConnection, getConnectionOptions } from "typeorm";

export const init = async () => {
  const nodeEnv = process.env.ENV || "dev";

  const optionFromFile = await getConnectionOptions(
    nodeEnv === "dev" ? "default" : nodeEnv
  );

  const option = { ...optionFromFile, name: "default" };

  return await createConnection(option);
};
