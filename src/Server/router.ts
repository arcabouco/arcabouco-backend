import { Router } from "express";
import { softwareRouter } from "../Domain/Software/router";
import { TagRouter } from "../Domain/Tag/router";

const router = Router();

router.use(softwareRouter);
router.use(TagRouter);

export { router };
