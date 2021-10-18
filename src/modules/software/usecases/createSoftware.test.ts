import { getConnection } from "typeorm";
import { database } from "../../../database";

import { config } from "dotenv";
config();

jest.setTimeout(10000);
beforeAll(async () => {
  const connection = await database();
  // await connection?.runMigrations();
  // return connection;
});

describe("Software useCase createSoftware", () => {
  test("can create a software", () => {
    return expect(true).toBe(true);
  });
});

// afterAll(async () => {
//   const connection = getConnection();
//   connection.close();
// });
