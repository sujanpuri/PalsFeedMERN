import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    userName: String,
    caption: String,
  },
  { timestamps: true }
);

export default mongoose.model("Post", postSchema);