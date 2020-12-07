const express = require("express")
const { authenticate_user } = require("../middleware/signin.middleware")
const router = express.Router()

router.post("/", authenticate_user)

module.exports = router