const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },

  avatar: {
    type: String,
  },
  role: {
    type: String,
    required: true,
    enum: ["USER", "ADMIN"],
  },
  state: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
});

userSchema.methods.toJSON = function () {

  const { __v, password, ...user } = this.toObject();

  return user;
};

module.exports = model("User", userSchema);
