import userModel from "../models/user.models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import fs from "fs";
// import { userModel } from "../models/user.models.js";
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      res.status(400).send({
        message: "email is required",
        success: false,
      });
    }
    if (!password) {
      res.status(400).send({
        message: "password is required",
        success: false,
      });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      res.status(300).send({
        message: "Email not found, please register",
        success: false,
      });
    }
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      res.status(400).send({
        message: "Wrong password",
        success: false,
      });
    }
    const token = await jwt.sign({ _id: user?._id }, process.env.JWT_KEY, {
      expiresIn: "1d",
    });
    res.status(200).send({
      message: "User logged in successfully",
      success: true,
      token,
    });
  } catch (error) {
    console.log(error);
  }
};

export const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.fields;
    if (!email) {
      res.status(400).send({
        message: "email is required",
        success: false,
      });
    }
    if (!password) {
      res.status(400).send({
        message: "password is required",
        success: false,
      });
    }
    if (!name) {
      res.status(400).send({
        message: "name is required",
        success: false,
      });
    }
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).send({
        message: "User already registered",
        success: false,
      });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const createdUser = new userModel({
      ...req.fields,
      password: hashPassword,
    });
    const { photo } = req.files;
    if (photo) {
      createdUser.photo.data = fs.readFileSync(photo.path);
      createdUser.photo.contentType = photo.type;
    }
    await createdUser.save();
    return res.status(200).send({
      message: "User registered successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
