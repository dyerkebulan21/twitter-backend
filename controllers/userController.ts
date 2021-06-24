import express from 'express'
import { validationResult } from 'express-validator'
import { UserModel } from '../models/userModel'
import { generateMD5 } from '../utils/generateHash'

class UserController {
   async index(_: any, res: express.Response): Promise<void> {
        const users = await UserModel.find({}).exec()
      try{
        res.json({
            status: 'success',
            data: users
        })
      }catch(err) {
        res.json({
            status: 'error', 
            message: JSON.stringify(err)
        })
      }

    }

    async create(req: express.Request, res: express.Response): Promise<void> {
        try {
          const errors = validationResult(req)
          if(!errors.isEmpty()) {
            res.status(400).json({errors: status, message: errors.array()})
            return 
          }
          const data = {
            username: req.body.username,
            fullname: req.body.fullname,
            password: req.body.password,
            email: req.body.email,
            confirm_hash: generateMD5(process.env.SECRET_KEY || Math.random().toString())
          }
          const user = await UserModel.create(data)
          res.json({
            status: 'success',
            data: user
          })
        }catch(err) {
          console.log(err)
        }   
    }

    
}

export const UserCtrl = new UserController()