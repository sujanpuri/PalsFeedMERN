import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import DbConnect from "./config/db.js";
import {register, login, admin, logout } from "./Controller/authController.js";
import authMiddleware from "./Middleware/authMiddleware.js";
import user from "./Controller/userController.js";      //handles user related APIs
import postRoutes from './Routes/postRoutes.js'     // Handles all post related APIs



const app = express();
dotenv.config();
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173", // Allow requests from your frontend
    credentials: true, // Allow cookies, tokens, sessions
}));
app.use(express.json());

DbConnect();

// **Homepage Route**
app.get("/", (req, res) => {
    res.send("Hello, welcome to the authentication API!");
});

// **Register Route**
app.post("/register", register);

// **Login Route**
app.post("/login", login);

// Protected Route (Only logged in User can See)
app.get("/user", authMiddleware, user);   // Middleware checks the credentials. (user inputs)

// Admin Route (Only Admin can see this page)
app.get("/admin", admin)

app.delete('/logout', logout);

// connects the postRoutes.js to the main server
app.use('/posts', postRoutes)
// now all post related routes start with /post, /post/create, /post/all

// Start Server
app.listen(8080, () => console.log("🚀 Server listening on port 8080"));