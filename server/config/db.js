const mongoose = require("mongoose");

async function mongodb() {
  await mongoose.connect("mongodb://localhost:27017/CHAT");
  console.log("_____database connected_____");
}
mongodb().catch((err) => console.log(err));

module.exports = mongoose;
