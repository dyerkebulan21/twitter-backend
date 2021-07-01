import {model, Schema, Document} from 'mongoose'


interface UserModelInterface {
    email: string,
    fullname: string,
    username: string,
    password: string,
    confirmHash: string,
    confirmed: string,
    location?: string,
    about?: string,
    website?:string
}

type UserModelDocumentInterface = UserModelInterface & Document

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
    confirmed: {
        type: Boolean,
        default: false
    },
    about: String,
    website: String
})

export const UserModel = model<UserModelDocumentInterface>('User', userSchema)