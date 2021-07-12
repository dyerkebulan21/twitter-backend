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

  async show(req: any, res: express.Response): Promise<void> {
    try {
      const user_id = req.params.id;
      if (!isValidObjectId(user_id)) {
        res.status(404).send();
        return;
      }
      if (!user_id) {
        res.status(400).send();
        return;
      }
      const user = await UserModel.findById(user_id).exec();
      res.json({
        status: "success",
        data: user,
      });
    } catch (err) {
      res.json({
        status: "error",
        message: JSON.stringify(err),
      });
    }
  }

  async create(req: express.Request, res: express.Response): Promise<void> {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: "error", message: errors.array() });
        return;
      }
      const data: UserModelInterface = {
        username: req.body.username,
        fullname: req.body.fullname,
        password: generateMD5(req.body.password + process.env.SECRET_KEY),
        email: req.body.email,
        confirmed_hash: generateMD5(
          process.env.SECRET_KEY || Math.random().toString()
        ),
      };
      const user = await UserModel.create(data);
      res.json({
        status: "success",
        data: user,
      });
      sendEmail(
        {
          emailFrom: "admin@twitter.com",
          emailTo: data.email,
          subject: "Подтверждение почты React Twitter",
          html: `Для того, чтобы подтвердить почту, перейдите <a href="http://localhost:3000/user/verify/${data.confirmed_hash}">по этой ссылке</a>`,
        },
        (err: Error | null) => {
          if (err) {
            res.json({
              status: "error",
              message: JSON.stringify(err),
            });
          } else {
            res.status(201).json({
              status: "success",
              data: user,
            });
          }
        }
      );
    } catch (err) {
      console.log(err);
    }
  }

  async verify(req: any, res: express.Response): Promise<void> {
    try {
      const hash = req.query.hash;
      if (!hash) {
        res.status(400).send();
        return;
      }
      const user = await UserModel.findOne({ confirmHash: hash }).exec();

      if (user) {
        user.confirmed = true;
        user.save();
        res.json({
          status: "success",
        });
      } else {
        res.status(404).send();
      }
    } catch (err) {
      res.status(500).json({
        status: "error",
        message: JSON.stringify(err),
      });
    }
  }
  async afterLogin(req: any, res: express.Response): Promise<void> {
    const user = req.user ? req.user.toJSON() : undefined;
    try {
      res.json({
        status: "success",
        data: {
          user,
          token: jwt.sign(req.user, process.env.SECRET_KEY || "QWERTY123", {
            expiresIn: "30d",
          }),
        },
      });
    } catch (err) {
      res.status(500).json({
        status: "error",
        message: JSON.stringify(err),
      });
    }
  }
}

export const UserCtrl = new UserController();
