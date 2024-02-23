import express from 'express';
import { allWorkouts, addWorkout } from '../controllers/workout.controller.js';
import protectRoute from '../middlewares/protectRoute.js';

const router = express.Router();


router.get('/', allWorkouts);
router.post('/addworkout',protectRoute, addWorkout);

export default router;