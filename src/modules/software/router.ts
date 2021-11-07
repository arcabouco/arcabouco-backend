import { Router } from "express";
import { SoftwareController } from "./controllers";

const router = Router();

router.post("/softwares", SoftwareController.create);
router.get("/softwares", SoftwareController.list);

export { router as softwareRouter };
