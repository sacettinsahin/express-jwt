const Post = require("../models/post.js");

const getPost = async (req, res) => {
  try {
    const getPosts = await Post.find();
    res.status(200).json(getPosts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createPost = async (req, res) => {
  try {
    const newPost = await Post.create(req.body);
    res.status(200).json(newPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const getDetail = await Post.findById(id);
    res.status(200).json(getDetail);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const updatePost = await Post.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updatePost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPost = await Post.findByIdAndDelete(id);
    res
      .status(201)
      .json({ message: "Post deleted successfully...", deletedPost });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const searchPost = async (req, res) => {
  const { name, tag } = req.query;

  try {
    const title = new RegExp(name, "i");
    const posts = await Post.find({
      $or: [{ title }, { tag: { $in: tag.split(",") } }],
    });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getPost,
  createPost,
  getDetail,
  getUpdate,
  deletePost,
  searchPost
};
