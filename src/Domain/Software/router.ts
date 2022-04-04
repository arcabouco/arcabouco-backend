import { Router } from "express";
import * as SoftwareController from "Domain/Software/Controller";
import multer from "multer";

const router = Router();

router.get("/softwares", SoftwareController.list);
router.get("/softwares/:softwareId", SoftwareController.get);

router.post("/softwares", multer().array("images"), SoftwareController.create);

export { router as softwareRouter };
