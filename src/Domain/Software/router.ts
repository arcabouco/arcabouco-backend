import { Router } from "express";
import * as SoftwareController from "Domain/Software/Controller";

const router = Router();

router.post("/softwares", SoftwareController.create);
router.get("/softwares", SoftwareController.list);
router.get("/softwares/:softwareId", SoftwareController.get);

export { router as softwareRouter };
