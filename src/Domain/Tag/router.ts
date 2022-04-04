import { Router } from "express";
import * as TagController from "Domain/Tag/Controller";

const router = Router();

router.post("/categories", TagController.createTagCategory);
router.get("/categories", TagController.listTagCategories);

router.post("/tags", TagController.addTag);

export { router as TagRouter };
