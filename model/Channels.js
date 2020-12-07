const mongoose = require("mongoose"); // require mongoose module
const CHANNEL_SCHEMA = mongoose.Schema;
const channel_schema = new CHANNEL_SCHEMA({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },

  tips: {
    required: true,
    unique: true,
    trim: true,
    type: Array,
  }
});

const Channels = mongoose.model("Channels", channel_schema)
module.exports = Channels