import { createConnection, getConnectionOptions } from "typeorm";

export const database = async () => {
  const connectionOption = await getConnectionOptions();

  Object.assign(connectionOption, {
    host: "arcabouco-database",
  });

  await createConnection(connectionOption);
};
