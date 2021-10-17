import { Router } from "express";
import { softwareRouter } from "../modules/software/router";

const router = Router();

router.use(softwareRouter);

export { router };
