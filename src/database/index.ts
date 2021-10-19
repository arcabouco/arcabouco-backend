import { createConnection, getConnection, getConnectionOptions } from "typeorm";

const init = async () => {
  const nodeEnv = process.env.ENV || "dev";

  const optionFromFile = await getConnectionOptions(
    nodeEnv === "dev" ? "default" : nodeEnv
  );

  console.log(nodeEnv);

  const option = { ...optionFromFile, name: "default" };

  return await createConnection(option);
};

const close = async () => {
  const nodeEnv = process.env.ENV || "dev";
  const isTest = nodeEnv.match("test");

  const connection = getConnection();

  const entities = connection.entityMetadatas;

  if (isTest) {
    await Promise.all(
      entities.map((entity) => {
        const repository = connection.getRepository(entity.name);
        return repository.clear();
      })
    );
  }

  await connection.close();
};

export const database = { init, close };
