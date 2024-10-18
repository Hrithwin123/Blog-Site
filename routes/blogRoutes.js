const express = require("express")

const blogController = require("../controllers/blogController")

const router = express.Router()


router.get("/", blogController.blog_index)
router.post("/", blogController.blog_post)
router.get("/:id", blogController.blog_get)
router.delete("/:id", blogController.blog_delete)


module.exports = router;