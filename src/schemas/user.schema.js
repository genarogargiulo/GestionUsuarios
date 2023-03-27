import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  _id:{type:String, _id:false},
  name: { type: String, required: true, minLenght:2, maxLenght:20 },
  surname: { type: String, required: true, minLenght:4, maxLenght:50 },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minLenght:10, maxLenght:25 },
  createdAt: { type: Date, required: false, default: Date.now },

});

const userModel = mongoose.model("User", userSchema);

export default userModel;