import mongoose from "mongoose";

const userPostSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      default: [],
    },
  ],
});

const UserPost = mongoose.model("UserPost", userPostSchema);

export default UserPost;
