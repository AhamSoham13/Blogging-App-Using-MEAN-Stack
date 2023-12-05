// const { updateOne } = require('../model/blogSchema'); // delete
const Blog = require("../model/blogSchema");
// const mongoose = require("mongoose");

// Create blog
const createBlog = async (req, res, next) => {
  // console.log(req.body);
  // const { title, body, authorDetail, postedAt, tags } = req.body;

  const { title, body } = req.body;

  const id = req.user.id;
  try {
    // const blogPost = await Blog.create({title, body, authorDetail: id, postedAt, tags});// the mapping is done based on the names of the fields in the schema. If the variable names in your code match the field names in the schema, you can directly pass them as values without specifying the key. If the names don't match, or if you want to explicitly specify a key, you can use the key-value syntax.
    // res.json({ blogPost });
    const blogPost = await Blog.create({ title, body, authorDetail: id }); //using this we Populate author details
    res.status(200).json({ blogPost, message: "Blog Created Successfully" });
  } catch (error) {
    console.log(error.message);
    next({ status: 500, message: error.message });
  }
};

// Get all blogs
const getAllBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find({}).populate(
      "authorDetail",
      "-email -password"
    ); //.sort({ 'postedAt': -1 });
    // console.log("get all blogs :- ",blogs);
    res.json({ blogs });
  } catch (error) {
    console.log(error.message);
    next({ status: 500, message: error.message });
  }
};

// Get blogs with blog Id
const getBlogById = async (req, res, next) => {
  try {
    const _id = req.params._id;
    // console.log(_id + typeof (_id));
    //  if (!mongoose.Types.ObjectId.isValid(_id)) {
    //    return next({ status: 400, message: "Invalid ObjectID" });
    //  }
    const blog = await Blog.findById(_id).populate("authorDetail", "-password");
    if (!blog) {
      return next({ status: 404, message: "Blog not found" });
    }
    res.json({ blog });
  } catch (error) {
    next({ status: 404, message: "last error" + error.message });
  }
};

//Search Blog by title
const searchBlogBytitle = async (req, res, next) => {
  const title = req.params.title;
    const tab = req.params.tab;
    console.log(req.params);
  console.log("in search Api :- ", title, " + ", tab, " ", req.user.id);
  if (tab === "All-Blogs") {
    try {
      const blog = await Blog.find({ title: title }).populate(
        "authorDetail",
        "-password"
      );
      if (!blog) {
        return next({ status: 404, message: "Blog not found" });
      }
      res.json({ blog });
    } catch (error) {
      next({ status: 404, message: "last error" + error.message });
    }
  } else {
    try {
      const blog = await Blog.find({
        title: title,
        authorDetail: req.user.id,
      }).populate("authorDetail", "-password");
      if (!blog) {
        return next({ status: 404, message: "Blog not found" });
      }
      res.json({ blog });
    } catch (error) {
      next({ status: 404, message: "last error" + error.message });
    }
  }
};

// Get your blogs
const getYourBlogs = async (req, res, next) => {
  try {
    const id = req.user.id;
    const blogs = await Blog.find({ authorDetail: id })
      .populate("authorDetail", "-email -password");
     // .sort({ postedAt: -1 });
    res.json({ blogs });
  } catch (error) {
    next({ status: 404, message: error.message });
  }
};

// Update Blog
const updateBlog = async (req, res, next) => {
  const id = req.params.id;
  if (!id) {
    return next({ status: 404, message: "Id is missing" });
  }
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      {
        $set: {
          title: req.body.title,
          body: req.body.body,
          authorDetail: req.user.id,
        },
      },
      { new: true }
    ); //will return the modified document
    res.status(201).json({
      message: "Updated the blog",
      blog: updatedBlog,
    });
  } catch (error) {
    next({ status: 500, message: error.message });
  }
};

// Delete Blog
const deleteBlog = async (req, res, next) => {
  const id = req.params.id;
  if (!id) {
    return next({ status: 404, message: "ID Is Missing" });
  }
  try {
    await Blog.deleteOne({
      _id: req.params.id, //,
      // authorDetail: req.user.id // delete
    });
    res.json({ message: "Blog Deleted Successfully " });
  } catch (error) {
    next({ status: 500, message: error.message });
  }
};

module.exports = {
  createBlog,
  getAllBlogs,
  getYourBlogs,
  updateBlog,
  deleteBlog,
  getBlogById,
  searchBlogBytitle,
};
