const express = require("express")
const { authorize_client, get_all_channels } = require("../middleware/channels.middleware")
const router = express.Router()

// hybrid route for handling all http verbs
router.route("/").get(authorize_client, get_all_channels).post(authorize_client)

module.exports = router