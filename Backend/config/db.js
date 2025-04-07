import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: '../.env' }); // relative to `Backend/config/db.js`
const DbConnect = async () => {
  try{
    console.log("URL  ",process.env.MONGO_URL);
    
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDb Connected.")
  }catch(error){
    console.error("MongoDB Connection Error: ", error)
  }
}

export default DbConnect;