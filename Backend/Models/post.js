// Backend: Update Post Schema
import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    userName: String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    caption: String,
    imageUrl: String,
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    comments: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        userName: String,
        text: String,
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Post", postSchema);
