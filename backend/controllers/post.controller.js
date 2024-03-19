import User from "../models/user.model.js";
import Post from "../models/post.model.js";
import Comment from "../models/comment.model.js";
import UserPost from "../models/user.post.model.js";
import Like from "../models/like.model.js";
import Reply from "../models/replies.model.js";

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

export const uploadImage = async (req, res) => {};

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

export const commentPost = async (req, res) => {
  const { comment, postId } = req.body;
  const userId = req.user._id;

  try {
    if (!userId || !comment || !postId) throw new Error();

    const newComment = {
      userId,
      postId,
      comment,
    };

    console.log(newComment);

    if (newComment) {
      const post = await Post.findById(postId);
      post.comments.push(newComment);
      await post.save();
      return res.status(202).json({
        success: true,
        message: "Comment added successfully",
        data: newComment,
      });
    }

    res.status(500).json({
      success: false,
      message: "Unable to add comment",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Unable to comment post: ${error.message}`,
    });
  }
};

export const replyComment = async (req, res) => {
  //FIXME: Fix this to take comment id from req.params
  const { commentId, postId, reply } = req.body;
  const userId = req.user._id; // id of the logged in user

  try {
    if (!commentId || !userId || !reply || !postId) {
      return res.status(403).json({
        success: false,
        message: "You is not logged in or the reply is empty",
      });
    }

    console.log(commentId, userId, reply);

    const foundPost = await Post.findById(postId);
    let foundit = {}
    const foundComment = foundPost.comments.find((cmt) => {
      if (JSON.stringify(cmt._id) === `"${commentId}"`) {
        foundit = cmt;
      }
      return cmt;
    })
    
    if(!foundComment) {
      return res.status(200).json({
        success:false,
        message: "No Comment found"
      })
    }

    const newReply = {
      userId,
      commentId,
      reply,
    };

    if(newReply) {
      const result = await Post.findOneAndUpdate(
        { _id: postId, 'comments._id': commentId },
        { $push: { 'comments.$.replies': newReply } },
        { returnOriginal: false }
      );
      return res.status(200).json({
        success: true,
        message: "Reply added successfully",
        data: newReply,
      })
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Unable to reply comment: ${error.message}`,
    });
  }
};

export const likePost = async (req, res) => {
  const { postId } = req.body;
  const userId = req.user._id;

  try {
    if (!userId || !postId) throw new Error();

    const existingLike = await Like.findOne({ userId, postId });
    if (existingLike) {
      return res.status(400).json({
        success: false,
        message: "You have already liked this post",
      });
    }

    const newLike = new Like({
      userId,
      postId,
    });

    if (newLike) {
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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Unable to like post: ${error.message}`,
    });
  }
};
