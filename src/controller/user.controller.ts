'use-strict';
import { Request, Response, NextFunction } from 'express';
import "dotenv/config";
import UserService from '@service/user.service';
class UserController {
    //[assign role]
    static async assignRole(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = (req as any).params;
            const roleId = req.body;
            const roleName = UserService.assignRole(userId, roleId);

            return res.json({ message: 'Đã gán role cho user', userId: userId, role: roleName });
        }
        catch (error) {
            next(error);
        }

    }
}

export default UserController;