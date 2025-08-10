'use-strict';
import { Request, Response, NextFunction } from 'express';
import "dotenv/config";
import RoleService from '@service/role.service';

class RoleController {
    //[add permission]
    static async addPermission(req: Request, res: Response, next: NextFunction) {
        try {
            const roleId = (req as any).params.roleId;
            const { permissionIds = [] } = req.body;
            const added = (await RoleService.addPermission(roleId, permissionIds)).added;


            return res.json({ message: 'Đã thêm permission cho role', added });
        }
        catch (error) {
            next(error);
        }

    }
    // [delete permission]
    static async removePermission(req: Request, res: Response, next: NextFunction) {
        try {
            const roleId = (req as any).params.roleId;
            const { permissionIds = [] } = req.body;

            console.log(roleId);
            console.log(permissionIds);
            const removed = (await RoleService.removePermissions(roleId, permissionIds)).removed;


            return res.json({ message: 'Đã gỡ permission khỏi role', removed });
        }
        catch (error) {
            next(error);
        }

    }
}

export default RoleController;