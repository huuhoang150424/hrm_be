import Employee from "@models/employees.model";
import "dotenv/config";
import { NotFoundError } from "@helper/index";

class EmpService {
  static async listEmp() {

    const employees = await Employee.findAll({
      where: {
        status: 'active'
      },
      raw: true
    });

    if (!employees) {
      throw new NotFoundError('Danh sách nhân viên không tồn tại');
    }
    return { employees };
  }

  static async updateEmp() {

    const employee = await Employee.findOne({
      where: {

        status: 'active'
      },
      raw: true
    });

    if (!employee) {
      throw new NotFoundError('Nhân viên không tồn tại');
    }
    return { employee };
  }
  
  static async addEmp() {

    const employee = await Employee.findOne({
      where: {

        status: 'active'
      },
      raw: true
    });

    if (!employee) {
      throw new NotFoundError('Nhân viên không tồn tại');
    }
    return { employee };
  }
}

export default EmpService;
