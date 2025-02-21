import express from 'express';
import { createPost, getAllPosts, getUserPosts, likePost, commentOnPost } from '../Controller/postController.js';

// This page handles the API routes. (define the endpoints)

// Allw us to define api routes, in seperate file to keep index.js clean.
const router = express.Router();

//defining routes for each API function.

// When req (POST) is sent to the /api/posts/create, it runs createPost() from postController.js
router.post("/create", createPost);
router.get("/all", getAllPosts);
router.get("/user/:userId", getUserPosts);      //userId is a dynamic parameter → /api/posts/user/12345 gets posts of user 12345.
router.post("/like", likePost);
router.post('/comment', commentOnPost);

export default router;