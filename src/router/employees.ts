import * as express from "express";
const router = express.Router();
import { EmpController } from "@controller";
import { authMiddleware } from "@middleware/auth";
import { hasPermission } from "@middleware/permission";

router.get("/listEmp",authMiddleware, hasPermission(['manage_users']),EmpController.listEmp );





export default router;