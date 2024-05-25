const Post = require("../Models/postModels");

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
    console.log(
      "---------These are all the post which have been saved inside the database----------",
      posts
    );
  } catch (err) {
    res.status(500).json({ error: "Unable to read posts." });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      res.status(404).json({ error: "Post not found." });
      return;
    }
    res.json(post);
    console.log(
      "---------this is the post which you were trying to fetch from the database---------",
      post
    );
  } catch (err) {
    res.status(500).json({ error: "Unable to read post." });
  }
};

exports.createPost = async (req, res) => {
  const { title, content, author } = req.body;
  if (!title || !content || !author) {
    res.status(400).json({ error: "Missing required fields." });
    return;
  }
  try {
    const newPost = await Post.create({ title, content, author });
    res.status(201).json(newPost);
    console.log("--------new post has been created--------", newPost);
  } catch (err) {
    res.status(500).json({ error: "Unable to create post." });
  }
};

exports.updatePost = async (req, res) => {
  const { title, content, author } = req.body;
  if (!title || !content || !author) {
    res.status(400).json({ error: "Missing required fields." });
    return;
  }
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { title, content, author },
      { new: true }
    );
    if (!updatedPost) {
      res.status(404).json({ error: "Post not found." });
      return;
    }
    res.json(updatedPost);
    console.log("----------you post has been updated---------", updatedPost);
  } catch (err) {
    res.status(500).json({ error: "Unable to update post." });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    if (!deletedPost) {
      res.status(404).json({ error: "Post not found." });
      return;
    }
    res.status(204).send();
    console.log("----------your post has been deleted successfully----------");
  } catch (err) {
    res.status(500).json({ error: "Unable to delete post." });
  }
};
