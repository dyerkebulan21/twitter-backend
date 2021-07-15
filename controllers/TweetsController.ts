import express from "express";
import { validationResult } from "express-validator";
import { UserModel } from "../models/userModel";
import { generateMD5 } from "../utils/generateHash";
import jwt from "jsonwebtoken";
import { sendEmail } from "../utils/sendEmail";
import { UserModelInterface } from "../models/userModel";
import { isValidObjectId } from "../utils/isValidObjectId";

class UserController {
  async index(_: any, res: express.Response): Promise<void> {
    const users = await UserModel.find({}).exec();
    try {
      res.json({
        status: "success",
        data: users,
      });
    } catch (err) {
      res.json({
        status: "error",
        message: JSON.stringify(err),
      });
    }
  }

  async show(req: any, res: express.Response): Promise<void> {}

  async create(req: express.Request, res: express.Response): Promise<void> {}

  async getUserInfo(req: any, res: express.Response): Promise<void> {}
}

export const UserCtrl = new UserController();
