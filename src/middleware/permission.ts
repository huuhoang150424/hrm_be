import { Request, Response, NextFunction } from 'express';
import { User, Role, Permission } from '@models'

export function hasPermission(requiredPermissions: string[]) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as any).userId;
 
      if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      const u = await User.findOne({
        where: {id : userId, status: 'active'}
      });

      const user = await User.findByPk(userId, {
        include: {
          model: Role,
          include: [Permission],
        },
        logging: console.log,
      });
      console.log(user)

      if (!user || !user.role) {
        return res.status(403).json({ message: 'Forbidden: No role assigned' });
      }

      const userPermissions = (user as any).role.permissions.map((p: any) => p.name);
      const allowed = requiredPermissions.some((rp) => userPermissions.includes(rp));
      console.log(userPermissions)
      console.log(allowed)

      if (!allowed) {
        return res.status(403).json({ message: 'Forbidden: Insufficient permission' });
      }

      next();
    } catch (err) {
      return res.status(500).json({ message: 'Permission check failed', error: err });
    }
  };
}
