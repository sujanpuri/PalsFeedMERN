import Post from "../Models/post.js";
import User from "../Models/user.js";

//Creating new Post
const createPost = async (req, res) => {
  try {
    // Extracts these data from the user Input (frontend)
    const { userId, photo, caption } = req.body;

    // Finds the user in the DB using userId.
    const user = await User.findById(userId);
    if (!user)
      return res.json({
        status: false,
        message: "User not Found while creating Post!!",
      });

    // Creates the new Post
    const newPost = new Post({
      userId,   //who creates the post
      profilePic: user.profilePic || "", 
      photo,    //image in the post
      caption,
    });
    await newPost.save();   //Saves the post to the DB
    // Sent Success Message
    res.json({ status: true, message: "Post created Successfully" });
  } catch (error) {
    console.log("Error while creating the Post : ", error);
  }
};

// Fetching all Posts from DB. 
const getAllPosts = async (req, res) => {
  try {
    // Uses ".populate()" to fetch & include user details like name & profilepic (using UserID).
    const posts = await Post.find().populate("userId", "name profilePic");
    res.json(posts);    //saves all posts as json.
  } catch (error) {
    res.json({ status: false, message: "" });
  }
};

// Fetching Posts from a specific User.
const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;    // Extract userId from req.params
    // Find all the post by this user.
    const posts = await Post.find({ userId }).populate(
      "userId",
      "name profilePic"
    );  // uses .populate to include user details.
    res.json(posts);
  } catch (error) {
    res.json({ status: false, message: true });
  }
};

// Finds the post, Checks if user has liked or not & toggles the like (like/remove)
const likePost = async (req, res) => {
  try {
    // Extracting PostId and UserId from the request body.
    const { postId, userId } = req.body;    // means frontend sends which post is liked/unliked by whom.

    // Finds the post using postId
    const post = await Post.findById(postId);
    if (!post) return res.json({ status: false, message: "Post not found" });

    // Checks if user has liked this post or not.
    if (post.likes.includes(userId)) {
      post.likes = post.likes.filter((id) => id.toString() !== userId);
    } else {
      post.likes.push(userId);
    }   // If liked, removes the like & if not it adds the like.

    await post.save();    //sends the updated post to the db
    res.json({status:true, message: "Post liked/ unliked successfully."})
  } catch (error) {
    res.json({ status: false, message: "Error while liking post" });
  }
};

// Saves new post with the new comment.
const commentOnPost = async (req, res) => {
  try {
    // Extract these info from the frontend.
    const { postId, userId, text } = req.body;

    // Finds the post in the DB
    const post = await Post.findById(postId);
    if (!post) return res.json({status:false, message: "Post not Found"})

    // checks if user exists in the db.
    const user = await User.findById(userId);
    if(!user) return res.json({status: false, message: "User not Found."})

    // Creates a new comment object & adds it to the posts comment array.
    const comment = {userId, text, createdAt: new Date()};
    post.comments.push(comment);
    
    // Saves the updated post in the DB.
    await post.save();
    res.json({status: true, message: "Comment Added."})
  } catch (error) {
    res.json({ status: false, message: "Error while commenting." });
  }
};

export {createPost, getAllPosts, getUserPosts, likePost, commentOnPost}