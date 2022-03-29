import { getConnection } from "typeorm";

export const close = async () => {
  const nodeEnv = process.env.ENV || "dev";
  const isTest = nodeEnv.match("test");

  const connection = getConnection();

  const entities = connection.entityMetadatas;

  if (isTest) {
    await Promise.all(
      entities.map((entity) => {
        const repository = connection.getRepository(entity.name);
        const table = repository.metadata.tableName;
        return repository.query(`TRUNCATE TABLE ${table} CASCADE`);
      })
    );
  }

  await connection.close();
};
