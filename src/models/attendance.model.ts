import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, ForeignKey } from 'sequelize-typescript';
import {Employee} from '@models'

@Table({
  tableName: 'attendance',
  timestamps: true, // Tự động thêm createdAt và updatedAt, nhưng sẽ ghi đè bằng giá trị mặc định dưới đây
})
export class Attendance extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  id!: number;

  @ForeignKey(() => Employee)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  employee_id!: number;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  check_in!: Date | null;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  check_out!: Date | null;

  @Column({
    type: DataType.DATEONLY,
    allowNull: true,
  })
  work_date!: Date | null;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
    allowNull: false,
  })
  created_at!: Date;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
    allowNull: false,
  })
  updated_at!: Date;
}

export default Attendance;