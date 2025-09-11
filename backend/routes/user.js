import express from "express"
import {create,getUser,login,register} from "../controller/user.controller.js"

const router = express.Router();

router.post('/create',create);

router.get('/getUser',getUser);

router.post('/register',register);

router.post('/login',login)

export default router;