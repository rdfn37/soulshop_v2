const { model, Schema } = require("mongoose");

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  birthdate: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = model("User", UserSchema);
