import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { register, login, admin, logout } from "./Controller/authController.js";
import authMiddleware from "./Middleware/authMiddleware.js";
import user from "./Controller/userController.js";
import { createPost, fetchAllPost } from "./Controller/postController.js";
import Post from "./Models/post.js";
import DbConnect from "./config/db.js";

dotenv.config();
const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ✅ Optional: Manually handle preflight if needed (not always required)
app.options(
  "*",
  cors({
    origin: true,
    credentials: true,
  })
);

// Middlewares
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Connect to DB
DbConnect();

// Routes
app.get("/", (req, res) => {
  res.send("Hello, welcome to the authentication API!");
});

app.post("/register", register);
app.post("/login", login);
app.get("/user", authMiddleware, user);
app.post("/posts/create", createPost);
app.get("/posts/getall", fetchAllPost);
app.get("/admin", admin);
app.delete("/logout", logout);

// Like a Post
app.post("/posts/:id/like", async (req, res) => {
  try {
    const { userId } = req.body;
    const post = await Post.findById(req.params.id);
    if (!post) return res.json({ message: "Post not found" });

    const index = post.likes.indexOf(userId);
    if (index === -1) {
      post.likes.push(userId);
    } else {
      post.likes.splice(index, 1);
    }

    await post.save();
    res.json({ likes: post.likes.length, likedBy: post.likes });
  } catch (err) {
    res.status(500).json({ message: "Error liking post" });
  }
});

// Add Comment
app.post("/posts/:id/comment", async (req, res) => {
  try {
    const { userId, userName, text } = req.body;
    const post = await Post.findById(req.params.id);
    if (!post) return res.json({ message: "Post not found" });

    post.comments.push({ userId, userName, text });
    await post.save();
    res.json(post.comments);
  } catch (err) {
    res.json({ message: "Error adding comment" });
  }
});

// Start the server
app.listen(8080, () => console.log("🚀 Server listening on port 8080"));
