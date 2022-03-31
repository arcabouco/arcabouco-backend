import { Router } from "express";
import * as SoftwareController from "Domain/Software/Controller";

const router = Router();

router.get("/softwares", SoftwareController.list);
router.get("/softwares/:softwareId", SoftwareController.get);

router.post("/softwares", SoftwareController.create);

export { router as softwareRouter };
