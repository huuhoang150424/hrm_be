'use-strict';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from "@service";
import { ApiResponse } from "@helper";
import "dotenv/config";

class EmpController{
  static async listEmp(req: Request, res: Response, next: NextFunction) {
    try {
        
      return res.status(200).json(ApiResponse.success( 'Có quyền truy cập'));
    } catch (error) {
      next(error);
    }
  }
}

export default EmpController;