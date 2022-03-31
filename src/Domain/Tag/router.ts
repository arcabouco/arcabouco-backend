import { Router } from "express";
import * as TagController from "Domain/Tag/Controller";

const router = Router();

router.post("/categories", TagController.createTagCategory);
router.get("/categories", TagController.listTagCategories);

router.post("/tags", TagController.createTag);

export { router as TagRouter };
