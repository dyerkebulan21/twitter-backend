import { model, Schema, Document } from "mongoose";

export interface TweetModelInterface {
  _id?: string;
  text: string;
  user: string;
}

type TweetModelDocumentInterface = TweetModelInterface & Document;

const TweetSchema = new Schema<TweetModelInterface>({
  text: {
    required: true,
    type: String,
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
