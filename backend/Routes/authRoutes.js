import express from "express";

import * as authController from "../controller/auth.js";


const router = express.Router();


// SIGNUP

router.post("/signup", authController.signup);


// LOGIN

router.post("/login", authController.login);


export default router;