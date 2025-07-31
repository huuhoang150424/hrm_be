import { Express } from 'express';
import authRouter from "./auth";


const route=(app:Express)=>{
  
    app.use("/auth",authRouter)

}
export default route;