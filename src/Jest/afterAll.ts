import { config } from "dotenv";
config();

import {
  ConnectionOptions,
  createConnection,
  getConnectionOptions,
} from "typeorm";

getConnectionOptions("test").then(async (optionFromFile) => {
  const option = { ...optionFromFile, name: "default" };

  const temporaryOption = {
    ...optionFromFile,
    database: "arcabouco",
  } as ConnectionOptions;

  const temporaryConnection = await createConnection(temporaryOption);
  await temporaryConnection.query("CREATE DATABASE test").catch(() => {});
  await temporaryConnection.close();

  const testConnection = await createConnection(option);
  await testConnection.dropDatabase();
  await testConnection.runMigrations({});
  await testConnection.close();
});
