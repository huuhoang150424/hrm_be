import * as express from "express";
const router = express.Router();
import RoleController from "@controller/role.controller";

router.post('/:roleId/permissions',RoleController.addPermission);
router.delete('/:roleId/permissions',RoleController.removePermission);

export default router;