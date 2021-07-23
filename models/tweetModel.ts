import { model, Schema, Document } from "mongoose";
import { UserModelInterface } from "./userModel";

export interface TweetModelInterface {
  _id?: string;
  text: string;
  user: UserModelInterface;
}

type TweetModelDocumentInterface = TweetModelInterface & Document;

const TweetSchema = new Schema<TweetModelInterface>({
  text: {
    required: true,
    type: String,
    maxLength: 280,
  },
  user: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export const TweetModel = model<TweetModelDocumentInterface>(
  "Tweet",
  TweetSchema
);
