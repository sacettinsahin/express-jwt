const express = require("express");
const {
  getPost,
  createPost,
  getDetail,
  getUpdate,
  deletePost,
  searchPost,
} = require("../controllers/post.js");
const auth = require("../middlewares/auth.js");

const router = express.Router();
router.get("/searchPost", searchPost);
router.get("/getPost", getPost);
router.post("/createPost", auth, createPost);
router.get("/getDetail/:id", getDetail);
router.patch("/getUpdate/:id", auth, getUpdate);
router.delete("/deletePost/:id", auth, deletePost);

module.exports = router;
