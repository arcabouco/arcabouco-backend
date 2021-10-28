import { Router } from "express";
import { TagController } from "./controllers";

const router = Router();

router.post("/tags/categories", TagController.createTagCategory);
router.post(
  "/softwares/:softwareId/categories/:categoryId/tags",
  TagController.createTag
);

export { router as TagRouter };
