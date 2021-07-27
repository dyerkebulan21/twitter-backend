import express from "express";
import { validationResult } from "express-validator";
import { TweetModel } from "../models/tweetModel";
import { UserModelInterface } from "../models/userModel";
import { isValidObjectId } from "../utils/isValidObjectId";

class TweetsController {
  async index(_: any, res: express.Response): Promise<void> {
    const tweets = await TweetModel.find({}).populate("user").exec();
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
      const tweet = await TweetModel.findById(tweet_id)
        .populate("user")
        .sort({ createdAt: "-1" })
        .exec();
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

  async create(req: express.Request, res: express.Response): Promise<void> {
    try {
      const user = req.user as UserModelInterface;
      const errors = validationResult(req);
      if (user?._id) {
        if (!errors.isEmpty()) {
          res.status(400).json({ errors: "error", message: errors.array() });
          return;
        }
        const data: any = {
          text: req.body.text,
          user: user._id,
        };
        const tweet = await TweetModel.create(data);
        res.json({
          status: "success",
          data: await tweet.populate("user").execPopulate(),
        });
      }
    } catch (err) {
      res.status(500).json({
        status: "error",
        message: err,
      });
    }
  }

  async delete(req: any, res: express.Response): Promise<void> {
    const user = req.user as UserModelInterface;

    try {
      if (user) {
        const tweet_id = req.params.id;
        if (!isValidObjectId(tweet_id)) {
          res.status(404).send();
          return;
        }
        const tweet = await TweetModel.findById(tweet_id);
        if (tweet) {
          if (String(tweet.user._id) === String(user._id)) {
            tweet.delete();
            res.send();
          } else {
            res.status(400).send();
          }
        } else {
          res.status(400).send();
        }
      }
    } catch (err) {
      res.status(500).json({
        status: "error",
        message: err,
      });
    }
  }
  async update(req: any, res: express.Response): Promise<void> {
    const user = req.user as UserModelInterface;

    try {
      if (user) {
        const tweet_id = req.params.id;
        if (!isValidObjectId(tweet_id)) {
          res.status(404).send();
          return;
        }
        const tweet = await TweetModel.findById(tweet_id);
        if (tweet) {
          if (String(tweet.user._id) === String(user._id)) {
            const text = req.body.text;
            tweet.text = text;
            tweet.save();
            res.send();
          } else {
            res.status(400).send();
          }
        } else {
          res.status(400).send();
        }
      }
    } catch (err) {
      res.status(500).json({
        status: "error",
        message: err,
      });
    }
  }
}

export const TweetsCtrl = new TweetsController();
