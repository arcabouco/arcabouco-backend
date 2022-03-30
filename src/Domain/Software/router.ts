import { Router } from "express";
import * as SoftwareController from "Domain/Software/Controller";
import { Middleware } from "Server";

const router = Router();

router.get("/softwares", SoftwareController.list);
router.get("/softwares/:softwareId", SoftwareController.get);

//auth routes
router.use(Middleware.verifyAuth);
router.post("/softwares", SoftwareController.create);

export { router as softwareRouter };
