// roles.model.ts
import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  BelongsToMany
} from 'sequelize-typescript';
import { Permission } from './permissions.model';
import { RolePermission } from './role_permissions.model';

@Table({
  tableName: 'roles',
  timestamps: true,
})
export class Role extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER, allowNull: false })
  id!: number;

  @Column({ type: DataType.STRING(50), allowNull: false, unique: true })
  name!: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  description!: string;

  // ✅ Quan hệ với Permission
  @BelongsToMany(() => Permission, () => RolePermission)
  permissions!: Permission[];
}

export default Role;
