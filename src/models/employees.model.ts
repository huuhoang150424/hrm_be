import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement } from 'sequelize-typescript';
import { StatusUser } from './enums';

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
    allowNull: true, // Cho phép null theo schema, nhưng bạn có thể đặt not null nếu cần
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

}

export default Employee;