const express = require("express")
const router = express.Router()
const { postController } = require("../controller/postController")



// endpoints for post
router.get("/", postController.getAllPosts)



module.exports = router