import "express-async-errors";
import express from "express";
import cors from "cors";
import { router } from "./router";

export const init = () => {
  const app = express();
  const port = process.env.PORT || 3040;
  const startedAt = new Date();

  app.use(express.json());
  app.use(cors());

  app.use(router);

  app.listen(port, () => console.log(`🚀 Server ready on port ${port}`));

  app.get("/", (_, response) =>
    response.json({
      status: "ok",
      startedAt,
      port,
    })
  );
};
