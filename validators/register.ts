import validator from "express-validator";

export const registerValidator = [
  validator
    .body("email", "Введите email")
    .isEmail()
    .withMessage("Неверный email")
    .isLength({
      min: 10,
      max: 40,
    })
    .withMessage("Неверная длина почты.Допустимое символов от 10 до 40"),
  validator.body('fullname', "Введите ваше имя").isString().withMessage("Неверное имя").isLength({min:2, max: 40}).withMessage("Неверная длина имени от 2 до 40")
];
