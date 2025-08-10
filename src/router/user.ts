import UserController from "@controller/user.controller";
import * as express from "express";
const router = express.Router();

router.post("/:userId/assign-role",UserController.assignRole);

export default router;