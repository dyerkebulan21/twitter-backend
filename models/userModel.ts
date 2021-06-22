import {model, Schema} from 'mongoose'

const userSchema = new Schema({
    email: {
        unique: true,
        required: true,
        type: String
    },
    fullname: {
        required: true,
        type: String
    },
    username: {
        unique: true,
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
    confirmed_hash: {
        required: true,
        type: String,
    },
    location: String,
    confirmed: Boolean,
    about: String,
    website: String
})

export const UserModel = model('User', userSchema)