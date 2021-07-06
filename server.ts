

import dotenv from 'dotenv'
dotenv.config()
import './core/db'
import express from 'express'
import {UserCtrl} from './controllers/UserController'
import { registerValidator } from './validators/register'


const app = express()

app.use(express.json())

app.get('/users', UserCtrl.index)
app.post('/users', registerValidator,UserCtrl.create)
app.get('/users/:id', UserCtrl.show)
app.get('/users/verify', UserCtrl.verify)
// app.patch('/user', UserCtrl.update)
// app.delete('/user', UserCtrl.delete)

app.listen(8888, ():void => {
    console.log("Server Running")
})