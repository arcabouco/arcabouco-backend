import { Router } from "express";
import * as UserController from "Domain/User/Controller";

const router = Router();

router.post("/auth/signup", UserController.signup);
router.post("/auth/confirmation", UserController.confirmation);
router.post("/auth/login", UserController.login);
router.post("/auth/password/request", UserController.requestRecovery);
router.post("/auth/password/recover", UserController.recoverPassword);

router.get("/user/email/:email", UserController.verifyEmail);

export { router as UserRouter };
