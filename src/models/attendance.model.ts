import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, ForeignKey } from 'sequelize-typescript';
import {Employee} from '@models'

@Table({
  tableName: 'attendance',
  timestamps: true, 
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

}

export default Attendance;