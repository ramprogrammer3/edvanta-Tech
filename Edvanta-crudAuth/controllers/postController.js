const Post = require("../models/postModel");
const User = require("../models/user");

// create post handleer
exports.createPost = async (req, res) => {
  try {
    // fetch data from body
    const { title, body } = req.body;

    // validating data
    if (!title || !body) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // create new post
    const newPost = await Post.create({
      title,
      body,
    });

    // updating user posts
    const updatedPost = await User.findByIdAndUpdate(
      req.user.id,
      { $push: { posts: newPost._id } },
      { new: true }
    )
      .populate("posts")
      .exec();

    // return response
    return res.status(200).json({
      success: true,
      message: "Post Created successfully",
      updatedPost,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to create post,please try again",
    });
  }
};

// get all post handler
exports.getAllPosts = async (req, res) => {
  try {
    // get all post from dataBAse
    const allPosts = await Post.find({}).sort({ createdAt: -1 });

    // return response
    return res.status(200).json({
      success: true,
      message: "All post fetched successfully",
      allPosts,
    });
  } catch (error) {
    return res.status(500).josn({
      success: false,
      message: "Unable to fetch posts",
    });
  }
};

exports.updatePost = async (req, res) => {
  try {
    // fetch post id
    const id = req.params.id;
    console.log(id);

    // fetch updated title and body
    const { title, body } = req.body;
    console.log(title,body);

    // update post
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      {
        title,
        body,
      },
      { new: true }
    );


    // return response

   return res.status(200).json({
      success : true,
      message : "Post updated successfully",
      updatedPost
    })

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to update post, please try again",
    });
  }
};

exports.deletePost = async (req, res) => {
  try {
    // fetch userId and post id
    const userId = req.user.id;

    // get post id from params
    const id = req.params.id;

    // update post id in user posts
    const updatedPost = await User.findByIdAndUpdate(
      userId,
      { $pull: { posts: id } },
      { new: true }
    )
      .populate("posts")
      .exec();

    // delete post
    await Post.findByIdAndDelete(id);

    // return response
    return res.status(200).json({
      success: true,
      message: "Post Deleted successfully",
      updatedPost,
    });
  } catch (error) {
    return res.status(500).josn({
      success: false,
      message: "Internal server error",
    });
  }
};
