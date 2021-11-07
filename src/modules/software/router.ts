import { Router } from "express";
import { SoftwareController } from "./controllers";

const router = Router();

router.post("/softwares", SoftwareController.create);
router.get("/softwares", SoftwareController.list);
router.get("/softwares/:softwareId", SoftwareController.get);

export { router as softwareRouter };
