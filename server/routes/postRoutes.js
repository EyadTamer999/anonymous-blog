const express = require("express")
const router = express.Router()
const { postController } = require("../controller/postController")

// endpoints for post
router.get("/", postController.getAllPosts)
router.post("/", postController.createPost)
router.put("/upvote/:postId", postController.upvotePost)
router.put("/downvote/:postId", postController.downvotePost)
router.delete("/:postId", postController.deletePost)




module.exports = router