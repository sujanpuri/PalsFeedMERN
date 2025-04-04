import jwt from "jsonwebtoken";

const verifyToken = async (req, res, next) => {
  const token = req.cookies.jwt;
  console.log("Token: ", token);

  if (!token) {
    return res.json({
      status: false,
      message: "Unauthorized: No token provided",
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    console.log("Decoded: ", decoded);

    if (err) {
      res.clearCookie("token"); // Clear JWT cookie to log out
      return res.json({
        status: false,
        message: "Unauthorized: Token expired",
        data: "No Jwt",
      });
    }

    req.user = decoded;
    res.json({
      status: true,
      message: "Authorized",
      data: decoded,
    });
    next();
  });
};

export default verifyToken;
