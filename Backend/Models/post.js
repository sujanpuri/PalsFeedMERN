import mongoose from "mongoose";

// Post Schema
const postSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to the user
  profilePic: { type: String, default: "" }, // URL to profile picture
  createdTime: { type: Date, default: Date.now }, // Fixed typo in "type"
  photo: [{ type: String, default: "" }], // URL of uploaded post image in array to upload multiple photos
  caption: { type: String, default: "" },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Store user IDs who liked the post
  comments: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // User who commented
      text: String,
      createdAt: { type: Date, default: Date.now }, // Timestamp for comment
    },
  ],
});

const Post = mongoose.model("Post", postSchema);

export default Post;
