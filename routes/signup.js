const express = require("express")
const { create_new_user } = require("../middleware/signup.middleware")
const router = express.Router()

router.post("/", create_new_user)

module.exports = router