import { config } from "dotenv";
config();

import "reflect-metadata";
import { Connection } from "./Database";
import * as Server from "Server";

const main = async () => {
  await Connection.init().catch(console.error);
  Server.init();
};

main().catch(console.error);
