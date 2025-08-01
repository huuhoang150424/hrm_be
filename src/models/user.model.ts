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
import { Role } from './roles.model'; // Đảm bảo đúng đường dẫn import

@Table({
  tableName: 'users',
  timestamps: true,
})
export class User extends Model {
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
  name!: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
    unique: true,
  })
  email!: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  password!: string;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  birthDate!: Date;

  @Column({
    type: DataType.ENUM('active', 'inactive'),
    defaultValue: 'active',
    allowNull: false,
  })
  status!: StatusUser;

  @Column({
    type: DataType.STRING(20),
    allowNull: true,
  })
  phoneNumber!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  address!: string;

  @Column({
    type: DataType.STRING(6),
    allowNull: true,
  })
  otpCode?: string;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  otpExpires?: Date;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  isVerified!: boolean;

  // ✅ Khóa ngoại role_id
  @ForeignKey(() => Role)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  role_id!: number;

  @BelongsTo(() => Role)
  role!: Role;
}

export default User;
