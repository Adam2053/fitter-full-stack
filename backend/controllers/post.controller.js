import User from "../models/user.model.js";
import Post from "../models/post.model.js";
import Comment from "../models/comment.model.js";
import UserPost from "../models/user.post.model.js";
import Like from "../models/like.model.js";
import mongoose from "mongoose";

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

    let userPost = await UserPost.findOne({ userId: loggedUser });

    console.log(!userPost);

    if (!userPost) {
      userPost = await UserPost.create({
        userId: loggedUser,
      });
    }

    const newPost = new Post({
      userId: loggedUser,
      imageUrl,
      caption,
      title,
    });
    console.log(newPost);
    if (newPost) {
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

    const deleteUserPost = await UserPost.updateOne(
      { userId: loggedUser },
      { $pull: { posts: postId } }
    );
    const deletePost = await Post.findByIdAndDelete({ postId });

    if (deleteUserPost && deletePost) {
      res.status(202).json({
        success: true,
        message: "Post deleted successfully",
        data: deletePost,
      });
    } else {
      return res.status(500).json({
        success: false,
        message: "Unable to delete post",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Unable to delete post: ${error.message}`,
    });
  }
};

export const editPost = () => {};

export const commentPost = async(req, res) => {
    const {comment, postId} = req.body;
    const userId = req.user._id;

    try{
      if(!userId || !comment || !postId) throw new Error();

      const newComment = new Comment({
        userId,
        postId,
        comment
      })

      if(newComment) {
        const post = await Post.findById(postId)
        console.log(post)
        post.comments.push(newComment._id);
        await post.save();
        await newComment.save();
        return res.status(202).json({
          success: true,
          message: "Comment added successfully",
          data: newComment,
        });
      }

      res.status(500).json({
        success: false,
        message: "Unable to add comment",
      })
    }catch(error) {
      res.status(500).json({
        success: false,
        message: `Unable to comment post: ${error.message}`,
      });
    }
};

export const likePost = async(req, res) => {
  const {postId} = req.body;
  const userId = req.user._id;

  try{
    if(!userId || !postId) throw new Error();

    const existingLike = await Like.findOne({userId, postId})
    if (existingLike) {
      return res.status(400).json({
        success: false,
        message: "You have already liked this post",
      })
    }

    const newLike = new Like({
      userId,
      postId
    })

    if(newLike) {
      const post = await Post.findById(postId);
      post.likes.push(newLike._id);
      post.likeCount += 1;
      await post.save();
      await newLike.save();
      res.status(202).json({
        success: true,
        message: "Like added successfully",
        data: newLike,
      });
    }
  }catch(error) {
    res.status(500).json({
      success: false,
      message: `Unable to like post: ${error.message}`,
    });
  }
};
