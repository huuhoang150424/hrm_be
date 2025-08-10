'use-strict';
import { Request, Response, NextFunction } from 'express';
import { EmpService } from "@service";
import { ApiResponse } from "@helper";
import "dotenv/config";

class EmpController{
  static async listEmp(req: Request, res: Response, next: NextFunction) {
    try {
      const employees = await EmpService.listEmp();
        
      return res.status(200).json(ApiResponse.success(employees, 'Hiển thị danh sách nhân viên thành công!'));
    } catch (error) {
      next(error);
    }
  }
  static async updateEmp(req: Request, res: Response, next: NextFunction) {
    try {
      const employee = await EmpService.updateEmp();
        
      return res.status(200).json(ApiResponse.success(employee, 'Cập nhật thông tin nhân viên thành công!'));
    } catch (error) {
      next(error);
    }
  }
  static async addEmp(req: Request, res: Response, next: NextFunction) {
    try {
      const employee = await EmpService.listEmp();
        
      return res.status(200).json(ApiResponse.success(employee, 'Thêm nhân viên thành công!'));
    } catch (error) {
      next(error);
    }
  }
}

export default EmpController;