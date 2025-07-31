import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, ForeignKey } from 'sequelize-typescript';
import Employee from './employees.model';

@Table({
  tableName: 'payroll',
  timestamps: true, // Tự động thêm createdAt và updatedAt, nhưng sẽ ghi đè bằng giá trị mặc định dưới đây
})
export class Payroll extends Model {
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
    type: DataType.DATEONLY,
    allowNull: true,
  })
  period_start!: Date | null;

  @Column({
    type: DataType.DATEONLY,
    allowNull: true,
  })
  period_end!: Date | null;

  @Column({
    type: DataType.DECIMAL(15, 2),
    allowNull: true,
  })
  base_salary!: number | null;

  @Column({
    type: DataType.DECIMAL(15, 2),
    allowNull: true,
  })
  bonus!: number | null;

  @Column({
    type: DataType.DECIMAL(15, 2),
    allowNull: true,
  })
  deductions!: number | null;

  @Column({
    type: DataType.DECIMAL(15, 2),
    allowNull: true,
  })
  net_salary!: number | null;

}

export default Payroll;