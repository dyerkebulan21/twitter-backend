

import dotenv from 'dotenv'
dotenv.config()
import './core/db'
import express from 'express'
import {UserCtrl} from './controllers/UserController'
import { registerValidator } from './validators/register'
import { passport } from './core/passport'


const app = express()

app.use(express.json())
app.use(passport.initialize())

app.get('/users', UserCtrl.index)
app.post('/auth/register', registerValidator,UserCtrl.create)
app.get('/users/:id', UserCtrl.show)
app.get('/users/verify', UserCtrl.verify)
// app.patch('/user', UserCtrl.update)
// app.delete('/user', UserCtrl.delete)
app.post('/auth/login', passport.authenticate('local'), function(req,res){
    res.json(req.user)
})

app.listen(8888, ():void => {
    console.log("Server Running")
})