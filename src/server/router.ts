import { Router } from "express";
import { softwareRouter } from "../modules/software/router";
import { TagRouter } from "../modules/tag/router";

const router = Router();

router.use(softwareRouter);
router.use(TagRouter);

export { router };
