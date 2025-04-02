import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import DbConnect from "./config/db.js";
import { register, login, admin, logout } from "./Controller/authController.js";
import authMiddleware from "./Middleware/authMiddleware.js";
import user from "./Controller/userController.js"; //handles user related APIs
import { createPost, fetchAllPost } from "./Controller/postController.js";
import Post from "./Models/post.js";

const app = express();
dotenv.config();
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173", // Allow requests from your frontend
    credentials: true, // Allow cookies, tokens, sessions
  })
);
app.use(express.json());

DbConnect();


// Serve uploaded images
app.use('/uploads', express.static('uploads'));


// **Homepage Route**
app.get("/", (req, res) => {
  res.send("Hello, welcome to the authentication API!");
});

// **Register Route**
app.post("/register", register);

// **Login Route**
app.post("/login", login);

// Protected Route (Only logged in User can See)
app.get("/user", authMiddleware, user); // Middleware checks the credentials. (user inputs)


//post related routes.
app.post("/posts/create", createPost);

app.get("/posts/getall", fetchAllPost);

// Backend: Like a Post
app.post("/posts/:id/like", async (req, res) => {
  try {
    const { userId } = req.body;

    // It searches for the post using the id from the request URL (req.params.id).
    const post = await Post.findById(req.params.id);
    if (!post) return res.json({ message: "Post not found" });

    // checks if the userId is already in the likes array (post.likes).
    const index = post.likes.indexOf(userId);
    if (index === -1) {
      post.likes.push(userId); // Like the post (by adding userId in the array)
    } else {
      post.likes.splice(index, 1); // Unlike the post (by removing the userId from the array)
    }

    await post.save();
    res.json({ likes: post.likes.length, likedBy: post.likes });
  } catch (err) {
    res.status(500).json({ message: "Error liking post" });
  }
});

// Backend: Add a Comment
app.post("/posts/:id/comment", async (req, res) => {
  try {
    const { userId, userName, text } = req.body;
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    post.comments.push({ userId, userName, text });
    await post.save();

    res.json(post.comments);
  } catch (err) {
    res.status(500).json({ message: "Error adding comment" });
  }
});


// Admin Route (Only Admin can see this page)
app.get("/admin", admin);

app.delete("/logout", logout);

// Start Server
app.listen(8080, () => console.log("🚀 Server listening on port 8080"));
