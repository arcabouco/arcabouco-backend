import "reflect-metadata";
import { database } from "./database";
import { server } from "./server/server";

const main = async () => {
  await database.init().catch(console.error);
  server();
};

main().catch(console.error);
