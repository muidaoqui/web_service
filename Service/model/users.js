// model/users.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email:   { type: String, required: true, unique: true },
  name:    { type: String, required: true },
  password:{ type: String, required: true },
  phone:   { type: String },
  address: { type: String },
  role:    { type: String, enum: ["user", "admin"], default: "user" }
}, {
  versionKey: false,
  timestamps: true
});

const UserModel = mongoose.model("User", userSchema);
export default UserModel;
