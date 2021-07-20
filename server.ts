import dotenv from "dotenv";
dotenv.config();
import "./core/db";
import express from "express";
import { UserCtrl } from "./controllers/UserController";
import { registerValidator } from "./validators/register";
import { passport } from "./core/passport";
import { TweetsCtrl } from "./controllers/TweetsController";
import { createTweetValidations } from "./validators/createTweet";

const app = express();

app.use(express.json());
app.use(passport.initialize());

app.get("/users", UserCtrl.index);
app.get("/users/me", passport.authenticate("jwt"), UserCtrl.getUserInfo);
app.get("/users/:id", UserCtrl.show);
app.get("/users/verify", UserCtrl.verify);

app.get("/tweets", TweetsCtrl.index);
app.get("/tweets/:id", TweetsCtrl.show);
app.post(
  "/tweets",
  passport.authenticate("jwt"),
  createTweetValidations,
  TweetsCtrl.create
);
app.delete("/tweets", passport.authenticate("jwt"), TweetsCtrl.delete);
// app.patch('/user', UserCtrl.update)
// app.delete('/user', UserCtrl.delete)
app.post("/auth/login", passport.authenticate("local"), UserCtrl.afterLogin);
app.post("/auth/register", registerValidator, UserCtrl.create);
app.listen(8888, (): void => {
  console.log("Server Running");
});
