import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const app = express();
app.use(express.json());
app.use(cors());

const Connect = async () => {
    console.log("Connecting to the database...");
    try{
        await mongoose.connect("mongodb+srv://mrpurisujan:palsfeed@palsfeedcluster.jbxxs.mongodb.net/PalsFeed?retryWrites=true&w=majority&appName=palsfeedCluster");
        console.log("Connected to the database...");
    }catch(err){
        console.log("Error while connecting to the database: ", err);
    }
};
Connect();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/about", (req, res)=>{
    res.send("This is About Us.");
});


app.listen(3080, () => {
    console.log("Server is running at the port 3080 localhost:3080");
});