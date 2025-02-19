import mongoose from "mongoose";
// User Schema
const adminSchema = new mongoose.Schema({
  email: String,
});
const Admin = mongoose.model("Admin", adminSchema);

export default Admin;