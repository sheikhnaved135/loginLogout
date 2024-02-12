import Router from "express";
import {
  loginController,
  registerController,
} from "../controller/auth.controller.js";
import formidable from "express-formidable";

const router = new Router();
router.post("/login", loginController);
router.post("/register", formidable(), registerController);

export default router;
