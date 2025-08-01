import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { StatusUser } from './enums';
import { Role } from './roles.model'; // Cập nhật đường dẫn nếu khác

@Table({
  tableName: 'employees',
  timestamps: true,
})
export class Employee extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  id!: number;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  full_name!: string;

  @Column({
    type: DataType.STRING(100),
    unique: true,
    allowNull: true,
  })
  email!: string | null;

  @Column({
    type: DataType.STRING(20),
    allowNull: true,
  })
  phone!: string | null;

  @Column({
    type: DataType.STRING(100),
    allowNull: true,
  })
  department!: string | null;

  @Column({
    type: DataType.STRING(100),
    allowNull: true,
  })
  position!: string | null;

  @Column({
    type: DataType.ENUM('active', 'inactive'),
    defaultValue: 'active',
    allowNull: false,
  })
  status!: StatusUser;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  })
  deleted!: boolean;

  // ✅ Foreign key đến roles
  @ForeignKey(() => Role)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  role_id!: number;

  @BelongsTo(() => Role)
  role!: Role;
}

export default Employee;
