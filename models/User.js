const mongoose = require("mongoose");
const { isEmail } = require("validator");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: [true, "Please enter an email"],
    lowercase: true,
    validate: [isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minLength: [6, "Minimum password length is 6 characters"],
  },
});

userSchema.post("save", function (doc, next) {
  console.log("New user was created and saved", doc);
  next();
});

userSchema.pre("save", function (next) {
  console.log("New user was created and saved", this);
  next();
});

const User = mongoose.model("user", userSchema);

module.exports = User;
