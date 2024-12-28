import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
   name: {
      firstname: {
         type: String,
         required: [true, "You must add a name"],
         trim: true,
      },
      firstname: {
         type: String,
         required: true,
         trim: true,
      },
   },
   email: {
      type: String,
      required: [true, "You must add an email"],
      unique: true,
   },
   password: {
      type: String,
      required: [true, "You must add a password"],
      select: false,
      unique: true,
   },
   avatar: {
      type: String,
      default: "default.jpg",
   },
});

const User = mongoose.model("User", userSchema);
export default User;

