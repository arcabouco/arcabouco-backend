import { createConnection, getConnectionOptions } from "typeorm";
import { optionAdjustment } from "./optionAjust";

export const database = async () => {
  const nodeEnv = process.env.ENV;
  const isTest = process.env.TEST === "true";

  console.log(isTest);

  const optionFromFile = await getConnectionOptions(nodeEnv);

  const option = {
    ...optionFromFile,
    ...optionAdjustment({ isTest: false, nodeEnv }),
  };

  const testOption = {
    ...optionFromFile,
    ...optionAdjustment({ isTest: true, nodeEnv }),
  };

  console.log({ option, testOption });

  if (isTest) {
    console.log("aaaeeeeeeeeeeee");
    const connection = await createConnection(option);
    await connection.query("CREATE DATABASE test").catch(() => {});
    await connection.close();

    const testConnection = await createConnection(testOption);
    await testConnection.dropDatabase();
    return testConnection;
  }

  return await createConnection(option);
};
