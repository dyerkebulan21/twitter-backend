import {body} from "express-validator";

export const registerValidator = [
    body("email", "Введите email")
    .isEmail()
    .withMessage("Неверный email")
    .isLength({
      min: 10,
      max: 40,
    })
    .withMessage("Неверная длина почты.Допустимое символов от 10 до 40"),
    body("fullname", "Введите  имя")
    .isString()
    .withMessage("Неверное имя")
    .isLength({ min: 2, max: 40 })
    .withMessage("Неверная длина имени от 2 до 40"),
    body("username", "Введите логин")
    .isString()
    .withMessage("Неверный логин")
    .isLength({ min: 2, max: 40 })
    .withMessage("Неверная длина в логине от 2 до 40"),
    body("password", "Введите логин")
    .isString()
    .isLength({min: 6})
    .withMessage("Минимальная длина пароля 6 символов")
    .custom((value, {req})=> {
      if(value !== req.body.password2) {
        throw new Error('Пароли не совпадают')
      } else {
        return value
      }
    }),
];
