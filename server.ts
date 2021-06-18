import express from 'express'

const app = express()

app.get('/', (_, res: express.Response) => {
    res.send('Salam Aleikum')
})


app.listen(8888, ():void => {
    console.log("Server Runned")
})