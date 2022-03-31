import { Router } from "express";
import { softwareRouter } from "../Domain/Software/router";
import { TagRouter } from "../Domain/Tag/router";
import { UserRouter } from "Domain/User";
import * as Middleware from "Server/Middleware";

const router = Router();

router.use(Middleware.verifyAuth);
router.use(softwareRouter);
router.use(TagRouter);
router.use(UserRouter);

export { router };
