import express from "express"
import {create,getUser} from "../controller/user.controller.js"
const router = express.Router();

router.post('/create',create);

router.get('/getUser',getUser);

export default router;