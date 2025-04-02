import jwt from 'jsonwebtoken';

// Checks if Users have valid jwt token
const authMiddleware = async (req, res, next) => {    
    const token = req.cookies.jwt;    // Checks the jwt token in the cookies of web
    if(!token) return res.json({status: false, message: "Unauthorized"});   //if no token found
  
    try{
      // Verifying JWT token 
      const decoded = jwt.verify(token, process.env.JWT_SECRET);  // Decoded typically contains the userId encoded in the token
      req.user = decoded;   //stores userId in "req.user"
      next();
      //we extracted the UserId from jwt token and saved it in the req.user so we can use this
    }catch(err){
      res.json({status: false, message: "Invalid Token."})
    }
  }

  export default authMiddleware;