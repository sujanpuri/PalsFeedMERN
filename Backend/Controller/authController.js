import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../Models/user.js";
import Admin from "../Models/admin.js";

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ status: false, message: "User already exist!!" });
    }
    
    // const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, password });
    await newUser.save();

    const user = await User.findOne({ email });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      // expiresIn: "1h",
    });
    res.cookie("jwt", token, {
      httpOnly: true,
      // maxAge: 3600000,
    });

    res.json({ status: true, message: "User registration Successfull." });
  } catch (error) {
    console.log("error in the /register: ", error);
  }
};

const login = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Find user in DB
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .json({ status: false, message: "Invalid Email!!" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .json({ status: false, message: "Invalid Password!!" });
    }

    // Generate JWT Token using user._id (made by db)
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      // expiresIn: "1h",
    });
    res.cookie("jwt", token, {
      httpOnly: true,
      // maxAge: 3600000,   //Jwt expires in 1 hour & user logs out after 1 hour
    });
    res.json({ status: true, message: "Login successful" });
  } catch (error) {
    console.error("❌ Error in /login:", error);
    res.json({ status: false, message: "Server error" });
  }
};

const logout = async (req, res) => {
  try {
    //clears the jwt from cookie "empty string".
    res.cookie("jwt", "", {
      httpOnly: true,
      expires: new Date(0), //jwt expires
    });
    res.json({ status: true, message: "logout successful" });
  } catch (error) {
    console.log(error);
  }
};

const admin = async (req, res) => {
  try {
    // checks if token is there on cookies or not
    const token = req.cookies.jwt;

    if (!token) {
      return res.json({ status: false, message: "No token provided" });
    } //if not throws out

    // if there is token Verify it with env jwt code
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; //stores userId (from jwt) in req.user

    // Finding the "req.user" or "userId" (user who is trying to access "/admin") data in the Db.
    const jwtuser = req.user.userId;
    const user = await User.findById(jwtuser);

    if (!user) {
      return res.json({ status: false, message: "User not found" });
    }

    const email = user.email; //extract the email of user
    const dbAdmin = await Admin.findOne({ email }); //find same email in admin DbCollection

    // If user email is found in admin DbCollection (it is admin "Authorized")
    if (dbAdmin) {
      return res.json({ status: true, message: "Authorized" }); //status is true
    } else {
      return res.json({ status: false, message: "Unauthorized" });
    }
  } catch (error) {
    console.error("❌ Error in /admin:", error);
    res.json({ status: false, message: "Server error" });
  }
};

export { register, login, logout, admin };
