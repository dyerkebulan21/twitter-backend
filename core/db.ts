import moongoose from 'mongoose'

moongoose.Promise = Promise
//mongodb://192.168.0.5:9999/foo 
moongoose.connect(process.env.MONGODB_URI || 'mongodb://192.168.0.5:9999/twitter', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true, 
    useFindAndModify: false 
})

const db = moongoose.connection 

db.on('error', console.error.bind(console, 'connection error'))

export {db, moongoose}