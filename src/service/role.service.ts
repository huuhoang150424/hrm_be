import Role from '@models/roles.model';
import Permission from '@models/permissions.model';
import { NotFoundError } from '@helper';
import { Op } from 'sequelize';

class RoleService {
    static async addPermission(roleId: number, permissionIds: number[]) {
        // Validate đầu vào
        if (!Array.isArray(permissionIds) || permissionIds.length === 0) {
            return { added: [], skipped: [], notFound: [] };
        }

        // Chuẩn hoá & loại trùng
        const ids = [...new Set(permissionIds.map(Number))].filter(Number.isInteger);

        const role = await Role.findByPk(roleId, {
            include: [{ model: Permission, attributes: ['id', 'name'] }],
        });
        if (!role) throw new NotFoundError('Role không tồn tại');

        // Lọc những id đã có để tránh lỗi unique khi add trùng
        const existingIds = new Set((role.permissions ?? []).map(p => p.id));
        const toAddIds = ids.filter(id => !existingIds.has(id));

        if (toAddIds.length === 0) {
            return { added: [], skipped: ids, notFound: [] };
        }

        // Lấy permission hợp lệ
        const permsToAdd = await Permission.findAll({
            where: { id: { [Op.in]: toAddIds } },
            attributes: ['id', 'name'],
        });

        // Id nào không tồn tại trong DB
        const foundIds = new Set(permsToAdd.map(p => p.id));
        const notFound = toAddIds.filter(id => !foundIds.has(id));

        if (permsToAdd.length > 0) {
            await role.$add('permissions', permsToAdd);
        }

        return {
            added: permsToAdd.map(p => p.name),
            skipped: ids.filter(id => existingIds.has(id)), // đã có sẵn trước đó
            notFound,
        };
    }

    static async removePermissions(roleId: number, permissionIds: number[]) {
        if (!Array.isArray(permissionIds) || permissionIds.length === 0) {
            return { removed: [], notAttached: [], skipped: [] };
        }

        // chuẩn hoá & loại trùng
        const ids = [...new Set(permissionIds.map(Number))].filter(Number.isInteger);

        // Lấy role + các permission hiện có (đủ để map tên, tránh query lần 2)
        const role = await Role.findByPk(roleId, {
            include: [{ model: Permission, attributes: ['id', 'name'], through: { attributes: [] } }],
        });
        if (!role) throw new NotFoundError('Role không tồn tại');

        const attached = new Map((role.permissions ?? []).map(p => [p.id, p.name]));
        const attachedIds = new Set(attached.keys());

        // tách IDs cần gỡ (đang gắn) và IDs không gắn (no-op)
        const toRemoveIds = ids.filter(id => attachedIds.has(id));
        const notAttached = ids.filter(id => !attachedIds.has(id));

        if (toRemoveIds.length === 0) {
            return { removed: [], notAttached, skipped: [] };
        }

        // Gỡ theo ID (không cần findAll perms)
        await role.$remove('permissions', toRemoveIds);

        // Tên các quyền đã gỡ (dựa vào danh sách đang gắn trước đó)
        const removed = toRemoveIds.map(id => attached.get(id)!);

        return { removed, notAttached, skipped: [] };
    }

}

export default RoleService;
