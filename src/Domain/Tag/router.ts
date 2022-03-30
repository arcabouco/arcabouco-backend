import { Router } from "express";
import * as TagController from "Domain/Tag/Controller";
import { Middleware } from "Server";

const router = Router();

router.get("/categories", TagController.listTagCategories);
router.post(
  "/softwares/:softwareId/categories/:categoryId/tags",
  TagController.createTag
);

router.use(Middleware.verifyAuth);
router.post("/categories", TagController.createTagCategory);

export { router as TagRouter };
