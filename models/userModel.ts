import { model, Schema, Document } from "mongoose";

export interface UserModelInterface {
  _id?: string;
  email: string;
  fullname: string;
  username: string;
  password: string;
  confirmed_hash: string;
  confirmed?: boolean;
  location?: string;
  about?: string;
  website?: string;
}

type UserModelDocumentInterface = UserModelInterface & Document;

const UserSchema = new Schema<UserModelInterface>(
  {
    email: {
      unique: true,
      required: true,
      type: String,
    },
    fullname: {
      required: true,
      type: String,
    },
    username: {
      unique: true,
      required: true,
      type: String,
    },
    password: {
      required: true,
      type: String,
      select: false,
    },
    confirmed_hash: {
      required: true,
      type: String,
      select: false,
    },
    location: String,
    confirmed: {
      type: Boolean,
      default: false,
    },
    about: String,
    website: String,
  },
  {
    timestamps: true,
  }
);

UserSchema.set("toJSON", {
  transform: function (_: any, obj: any) {
    delete obj.password;
    delete obj.confirmHash;
    return obj;
  },
});

export const UserModel = model<UserModelDocumentInterface>("User", UserSchema);
