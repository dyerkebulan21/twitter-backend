
import express from 'express'
import {UserCtrl} from './controllers/UserController'
import { registerValidator } from './validators/register'
import dotenv from 'dotenv'
import './core/db'
const app = express()
dotenv.config()
app.use(express.json())

app.get('/users', UserCtrl.index)
app.post('/users', registerValidator,UserCtrl.create)
// app.patch('/user', UserCtrl.update)
// app.delete('/user', UserCtrl.delete)

app.listen(8888, ():void => {
    console.log("Server Running")
})