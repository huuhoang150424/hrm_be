import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import "dotenv/config"

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token // Bearer tokens

  if (!token) return res.status(401).json({ message: 'Token không tồn tại' });

  try {

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: number };
    (req as any).userId = decoded.userId;

    next();
  } catch {
    return res.status(401).json({ message: 'Token không hợp lệ' });
  }
};


