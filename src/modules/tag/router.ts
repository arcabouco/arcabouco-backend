import { Router } from "express";
import { TagController } from "./controllers";

const router = Router();

router.post("/tags/categories", TagController.createTagCategory);

export { router as TagRouter };
