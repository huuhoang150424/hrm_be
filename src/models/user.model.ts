import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'users',
  timestamps: true, // Tự động thêm createdAt và updatedAt
})
export class User extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
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
  status!: 'active' | 'inactive';

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
    defaultValue: false
  })
  isVerified!: boolean;

}

export default User;
