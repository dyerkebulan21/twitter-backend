import { body } from "express-validator";

export const createTweetValidations = [
  body("text", "Введите email")
    .isString()
    .isLength({
      min: 10,
      max: 40,
    })
    .withMessage("Максимальная длина твита 270 символов"),
];
