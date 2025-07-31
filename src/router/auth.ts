import * as express from "express";
const router = express.Router();
import { AuthController } from "@controller";
import { validatorLogin} from "@validation";
import { validatorChangePassword, validatorResetPassword } from "@validation/auth.validation";
import { authMiddleware } from "@middleware/auth";


router.get("/login", validatorLogin,AuthController.login as any);
router.post("/sendVerify",AuthController.sendVerify as any);
router.get("/verify",AuthController.verify as any);
router.post("/logout", AuthController.logout as any);
router.post("/forgotPassword", AuthController.forgotPassword as any);
router.patch("/resetPassword",validatorResetPassword, AuthController.resetPassword as any);
router.patch("/changePassword",validatorChangePassword,authMiddleware, AuthController.changePassword as any);




export default router;