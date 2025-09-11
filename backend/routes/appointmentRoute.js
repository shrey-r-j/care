import express from "express";
import { createAppointment , getInfo} from "../controller/appointment.controller.js";
const router = express.Router();

router.post('/',createAppointment);

router.get('/info',getInfo);

export default router;