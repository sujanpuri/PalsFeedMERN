import mongoose from "mongoose";

const DbConnect = async () => {
  try{
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDb Connected.")
  }catch(error){
    console.error("MongoDB Connection Error: ", error)
  }
}

export default DbConnect;