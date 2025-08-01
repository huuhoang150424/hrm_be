import { Express } from 'express';
import authRouter from "./auth";
import empRouter from "./employees"


const route=(app:Express)=>{
  
    app.use("/auth",authRouter)
    app.use("/employee",empRouter)
}
export default route;