import * as express from "express";
const router = express.Router();
import { EmpController } from "@controller";


router.get("/listEmp",EmpController.listEmp );
router.patch("/updateEmp/:id",EmpController.updateEmp );
router.post("/addEmp",EmpController.addEmp );





export default router;