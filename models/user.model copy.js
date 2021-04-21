const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/csplusannonce", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

var userSchema = mongoose.Schema({
    uid: String,
    token: String,
    email: String,
    name: String,
    gender: String,
    pic: String
});

module.exports = mongoose.model('UserF', userSchema);
