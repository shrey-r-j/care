import express from "express";
import { createAppointment , getInfo,getAll,updateAppointment} from "../controller/appointment.controller.js";
const router = express.Router();

router.post('/',createAppointment);

router.get('/info',getInfo);

router.get('/all',getAll);

router.post('/update',updateAppointment);

export default router;