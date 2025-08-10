import User from "@models/user.model";
import Role from "@models/roles.model";
import { NotFoundError } from '@helper';
class UserService {
    static async assignRole(userId: number, roleId: number) {
        const [user, role] = await Promise.all([
            User.findByPk(userId),
            Role.findByPk(roleId),
        ]);
        if (!user) throw new NotFoundError('User không tồn tại');
        if (!role) throw new NotFoundError('Role không tồn tại');

        user.role_id = role.id;
        await user.save();
        return role.name;

    }
}

export default UserService;