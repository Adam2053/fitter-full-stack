import express from 'express';
import { allWorkouts, addWorkout, getUserWorkout, deleteWorkout } from '../controllers/workout.controller.js';
import protectRoute from '../middlewares/protectRoute.js';

const router = express.Router();


router.get('/', allWorkouts);
router.post('/addworkout',protectRoute, addWorkout);
router.get('/getworkout', protectRoute, getUserWorkout);
router.delete('/deleteworkout',protectRoute, deleteWorkout);

export default router;