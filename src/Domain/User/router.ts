import { Router } from "express";
import * as UserController from "Domain/User/Controller";

const router = Router();

router.post("/auth/signup", UserController.signup);
router.post("/auth/confirmation", UserController.confirmation);

export { router as UserRouter };
