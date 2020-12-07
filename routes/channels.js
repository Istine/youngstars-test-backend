const express = require("express");
const {
  authorize_client,
  get_all_channels,
  subscribe_to_channel,
  fetch_my_channels,
} = require("../middleware/channels.middleware");
const router = express.Router();

// hybrid route for handling all http verbs
router
  .route("/")
  .get(authorize_client, get_all_channels)
  .put(authorize_client, subscribe_to_channel);

  router.get("/my-channels", authorize_client, fetch_my_channels)
module.exports = router;