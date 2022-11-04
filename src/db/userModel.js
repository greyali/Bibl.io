const mongoose = require("mongoose");
const { Schema } = mongoose;

const bcrypt = require("bcryptjs");
const SALT_WORK_FACTOR = 10;
const SALT = bcrypt.genSaltSync(SALT_WORK_FACTOR, (err, salt) => {
  if (err) {
    console.log("Error generating salt: ", err);
  }
  return salt;
});

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  favorites: { type: Array, required: false },
});

module.exports = mongoose.model("User", userSchema);
