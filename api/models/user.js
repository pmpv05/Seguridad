const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const NodeRSA = require('node-rsa');
const crypto = require("crypto-js/sha256");

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
  return bcrypt.compare(oldPassword, newPassword);
  //return crypto.compare(oldPassword, newPassword);
};

const hashPassword = async function (next) {
  const user = this;
  user.password = await bcrypt.hash(user.password, saltRounds);
  //user.password = await crypto.SHA256(user.password);
  return next();
};

const createPublicKey = async function (next) {
  const user = this;
  user.publicKey = await new NodeRSA({ b: 512 }, 'pkcs8-public').exportKey('pkcs8-public');
  return next();
};

userSchema.pre('save', hashPassword);
userSchema.pre('save', createPublicKey);

const User = mongoose.model('User', userSchema);

module.exports = User;
