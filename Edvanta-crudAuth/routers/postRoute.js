const express = require("express");
const router = express.Router();

const {
  createPost,
  getAllPosts,
  updatePost,
  deletePost,
} = require("../controllers/postController");
const { auth } = require("../middlewares/auth");

// to get all post login is not required
router.get("/getAllPost", getAllPosts);

// to create, update, and delete a post, login is required
router.post("/createPost", auth, createPost);

router.put("/updatePost/:id", auth, updatePost);

router.delete("/deletePost/:id", auth, deletePost);

// export router
module.exports = router;
