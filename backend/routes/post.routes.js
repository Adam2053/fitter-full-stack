import express from 'express';
import protectRoute from '../middlewares/protectRoute.js';
import { addPost, commentPost, deletePost, editPost, getAllPosts, likePost } from '../controllers/post.controller.js';

const router = express.Router();

router.get('/', protectRoute, getAllPosts);
router.post('/addpost', protectRoute, addPost);
router.delete('/removepost', protectRoute, deletePost);
router.put('/editpost', protectRoute, editPost);
router.post('/comment', protectRoute, commentPost);
router.post('/like', protectRoute, likePost);


export default router;