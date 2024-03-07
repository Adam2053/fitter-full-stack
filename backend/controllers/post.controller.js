import User from "../models/user.model.js";
import Post from "../models/post.model.js";
import Comment from "../models/comment.model.js";
import UserPost from "../models/user.post.model.js";


export const getAllPosts = async (req, res) => {
  const loggedUser = req.user._id;
  try {
    const allPosts = await Post.find({});

    if (!allPosts && loggedUser) {
      return res.status(404).json({
        success: false,
        message: "No posts found",
      });
    }

    res.status(202).json({
      success: true,
      message: "Posts fetched successfully",
      data: allPosts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Unable to get posts: ${error.message}`,
    });
  }
};

export const addPost = async (req, res) => {
  const { imageUrl, caption, title } = req.body;
  const loggedUser = req.user._id;

  try {
    if (!loggedUser || !imageUrl || !caption || !title) {
      throw new Error();
    }

    let userPost = await UserPost.findOne({userId: loggedUser});

    console.log(!userPost)

    if(!userPost) {
        userPost = await UserPost.create({
            userId: loggedUser,
        })
    }

    const newPost = new Post({
        userId: loggedUser,
        imageUrl,
        caption,
        title
    });
    console.log(newPost)
    if(newPost) {
        userPost.posts.push(newPost._id);
    }

    await userPost.save();
    await newPost.save();

    res.status(200).json({
      success: true,
      message: "Post added successfully",
      data: newPost,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Unable to add post: ${error.message}`,
    });
  }
};

export const deletePost = async (req, res) => {
  const postId = req.body.postId;
  const loggedUser = req.user._id;

  try {
    if (!postId || !loggedUser) {
      throw new Error();
    }

    const deletePost = await Post.findByIdAndDelete({ postId });
    res.status(202).json({
        success: true,
        message: "Post deleted successfully",
        data: deletePost
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Unable to delete post: ${error.message}`,
    });
  }
};

export const editPost = () => {};

export const commentPost = () => {};

export const likePost = () => {};
