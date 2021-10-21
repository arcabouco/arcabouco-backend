import { Router } from "express";
import { SoftwareController } from "./controllers";

const router = Router();

router.post("/softwares", SoftwareController.create);

export { router as softwareRouter };
