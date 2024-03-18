import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  firstname: String,
  lastname: {
    type: String,
  },
  zipcode: Number,
  city: String,
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
});
UserSchema.methods.toJSON = function () {
  let obj = this.toObject();
  delete obj.password;
  return obj;
};
export default mongoose.model("User", UserSchema);
