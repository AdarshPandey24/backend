import express from "express";
import register from "../controllers/register.js";
import login from "../controllers/login.js";
import resetPassword from "../controllers/resetPassword.js"
import auth from "../middleware/Auth.js";
const router = express.Router();
router.use('/resetpassword',auth)


router.post('/register',register)
router.post('/login',login)
router.post('/resetpassword',resetPassword)
export default router