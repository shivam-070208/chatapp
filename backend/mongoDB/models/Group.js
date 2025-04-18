const mongoose = require("mongoose");

const GroupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  members: { type: [String], required: true }, // Array of member emails
  messages: [
    {
      sender: { type: String, required: true },
      message: { type: String, required: true },
      timestamp: { type: Date, default: Date.now },
    },
  ],
});

const GroupModel = mongoose.model("Group", GroupSchema);
module.exports = GroupModel;