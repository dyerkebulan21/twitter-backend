
import express from 'express'
import {UserCtrl} from './controllers/UserController'
import { registerValidator } from './validators/register'
const app = express()

app.use(express.json())

app.get('/user', UserCtrl.index)
app.post('/user', registerValidator,UserCtrl.create)
// app.patch('/user', UserCtrl.update)
// app.delete('/user', UserCtrl.delete)

app.listen(8888, ():void => {
    console.log("Server Running")
})