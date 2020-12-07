const express = require("express");
const {
  authorize_client,
  get_all_channels,
  subscribe_to_channel,
} = require("../middleware/channels.middleware");
const router = express.Router();

// hybrid route for handling all http verbs
router
  .route("/")
  .get(authorize_client, get_all_channels)
  .put(authorize_client, subscribe_to_channel);

module.exports = router;
