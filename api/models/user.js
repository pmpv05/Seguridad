const mongoose = require('mongoose');
const crypto = require("crypto-js");

const saltRounds = 10;

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, index: { unique: true } },
    name: { type: String, required: true },
    password: { type: String, required: true },
    publicKey: { type: String, required: false }
  },
  {
    timestamps: true,
  },
);

userSchema.methods.comparePassword = async function (oldPassword, newPassword) {
  return (crypto.SHA256(oldPassword).toString()) === newPassword;
};

const hashPassword = async function (next) {
  const user = this;
  user.password = await crypto.SHA256(user.password);
  return next();
};

userSchema.pre('save', hashPassword);

const User = mongoose.model('User', userSchema);

module.exports = User;
