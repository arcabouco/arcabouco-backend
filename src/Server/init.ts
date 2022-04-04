import express from "express";
import cors from "cors";
import { router } from "./router";
import { errorHandler } from "Server/ErrorHandler";
import bodyParser from "body-parser";
import multer from "multer";

export const init = () => {
  const app = express();
  const port = process.env.PORT || 3040;
  const startedAt = new Date();

  app.use(cors());
  app.use(express.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(router);
  app.use(errorHandler);

  app.listen(port, () => console.log(`🚀 Server ready on port ${port}`));

  app.get("/", (_, response) =>
    response.json({
      status: "ok",
      startedAt,
      port,
    })
  );
};
