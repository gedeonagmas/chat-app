const mongoose = require("./../config/db");

const groupSchema = mongoose.Schema({
  groupName: { type: String },
  flag: { type: String },
  ownersName: { type: String },
  ownersId: { type: String },
  groupPro: { type: String, default: "uploads/groupDefault.png" },
  members: { type: [String] },
  requests: { type: [String] },
});

module.exports.groupModel = mongoose.model("groups", groupSchema);
