import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
   name: {
      firstname: {
         type: String,
         required: [true, "You must add a name"],
         trim: true,
      },
      lastname: {
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

// -------------------- Mongoose Middleware -----------------------
// Document Middleware to Hash Password
userSchema.pre("save", async function (next) {
   // check if password is modified
   if (!this.isModified("password")) return next();

   // number of SaltRounds
   const salt = await bcrypt.genSalt(12);
   // Hash Password with the salt
   this.password = await bcrypt.hash(this.password, salt);
});

// Instance Methods
userSchema.methods.correctPassword = async function (InputPassword, DBpassword) {
   return await bcrypt.compare(InputPassword, DBpassword);
};

const User = mongoose.model("User", userSchema);
export default User;
