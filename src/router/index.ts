import { Express } from 'express';
import authRouter from "./auth";
import empRouter from "./employees"
import userRouter from "./user";
import roleRouter from "./role";
import { authMiddleware } from "@middleware/auth";
import { hasPermission } from "@middleware/permission";
const route=(app:Express)=>{
  
    app.use("/auth",authRouter);
    app.use("/employee",authMiddleware, hasPermission(["manage_user"], 'any'),empRouter);
    app.use("/user",authMiddleware, hasPermission(['manage_roles'], 'any'), userRouter);
    app.use("/roles",authMiddleware, hasPermission(['manage_roles'], 'any'), roleRouter);
}
export default route;