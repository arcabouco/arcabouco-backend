import "express-async-errors";
import express from "express";
import cors from "cors";
import { router } from "./router";
import { existsSync } from "fs";

export const server = () => {
  const app = express();
  const port = process.env.PORT || 3040;

  app.use(express.json());
  app.use(cors());

  app.use(router);

  app.listen(port, () => console.log(`🚀 Server ready on port ${port}`));

  console.log(existsSync("/.dockerenv"))
};
