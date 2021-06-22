import express from 'express'
import { UserModel } from '../models/userModel'

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

    // async create(req: express.Request, res: express.Response): Promise<void> {
    //     try {

    //     }catch(err) {

    //     }   
    // }

    
}

const UserCtrl = new UserController()