import express from "express"
import {create,getUser,register} from "../controller/user.controller.js"

const router = express.Router();

router.post('/create',create);

router.get('/getUser',getUser);

router.post('/register',register);



export default router;