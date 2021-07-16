import express from "express";
import { validationResult } from "express-validator";
import { TweetModel } from "../models/tweetModel";
import { generateMD5 } from "../utils/generateHash";
import jwt from "jsonwebtoken";
import { sendEmail } from "../utils/sendEmail";
import { UserModelInterface } from "../models/userModel";
import { isValidObjectId } from "../utils/isValidObjectId";

class TweetController {
  async index(_: any, res: express.Response): Promise<void> {
    const tweets = await TweetModel.find({}).exec();
    try {
      res.json({
        status: "success",
        data: tweets,
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
      const tweet_id = req.params.id;
      if (!isValidObjectId(tweet_id)) {
        res.status(404).send();
        return;
      }
      const tweet = await TweetModel.findById(tweet_id).exec();
      if (!tweet) {
        res.status(400).send();
        return;
      }
      res.json({
        status: "success",
        data: tweet,
      });
    } catch (err) {
      res.status(500).json({
        status: "error",
        message: JSON.stringify(err),
      });
    }
  }

  async create(req: express.Request, res: express.Response): Promise<void> {}

  async getUserInfo(req: any, res: express.Response): Promise<void> {}
}

export const TweetCtrl = new TweetController();
