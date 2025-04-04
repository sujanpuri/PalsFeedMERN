import Post from "../Models/post.js";

const createPost = async (req, res) => {
  try {
    const { userName, caption, imageUrl, userId } = req.body;

    if (!userName || !caption) {
      return res.json({
        status: false,
        message: "UserId & caption not found!",
      });
    }

    const newPost = new Post({
      userName,
      caption,
      userId,
      imageUrl,
      likes: [],
      comments: [],
    });
    await newPost.save();

    res.json({ status: true, message: "Post created Successfully." });
  } catch (err) {
    console.log("Error: ", err);
    res.json({ status: false, message: "Error creating the post." });
  }
};

const fetchAllPost = async (req, res) => {
  try {
    const posts = await Post.find().select("userName caption createdAt imageUrl likes comments");
    res.json({status: true, message: "Posts fetched successfully.", data: posts});
  } catch (error) {
    console.log("Error fetching posts:", error);
    res.json({ status: false, message: "Error fetching the Post.", data: "Error" });
  }
};

export { createPost, fetchAllPost };
