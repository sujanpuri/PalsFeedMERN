import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import DbConnect from "./config/db.js";
import {register, login, admin, logout } from "./Controller/authController.js";
import authMiddleware from "./Middleware/authMiddleware.js";
import user from "./Controller/userController.js";



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

// Start Server
app.listen(8080, () => console.log("🚀 Server listening on port 8080"));