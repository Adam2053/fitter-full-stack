import axios from "axios";
import Workout from "../models/workouts.model.js";
import UserWorkout from "../models/user.workout.model.js";

// px5d3cstj imagekit id

// TODO: Implement all the features stated below in you application
// features to add in workout planners
// DONE:  User authentication 
// DONE: Create, edit, and delete workouts
// TODO: Reorder exercises with drag-and-drop
//  Custom exercise selector
// Upcoming features
//  Exercises with muscle activation information
//  Workout tracking
//  Workout splits
// TODO: Public workout feed
// add limit to workout list based on a muscle type

const obj = [
  {
    name: "bicep curls",
    muscle: "biceps",
  },
  {
    name: "triceps curls",
    muscle: "triceps",
  },
];

export const allWorkouts = async (req, res) => {
  const options = {
    method: "GET",
    url: "https://exercises-by-api-ninjas.p.rapidapi.com/v1/exercises",
    params: {
      muscle: "biceps",
    },
    headers: {
      "X-RapidAPI-Key": "2362c59e32mshf3129ef94520c4ep137fe6jsndd4b76f5be13",
      "X-RapidAPI-Host": "exercises-by-api-ninjas.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    res.status(200).json({
      success: true,
      data: response.data,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: `Unable to get workouts: ${error.message}`,
    });
  }
};

// this is the route to add workout by a logged user
export const addWorkout = async (req, res) => {
  // we take name and muscle as the parameter from our front end using body object
  const { name, muscle } = req.body;

  // we are storing the logged userId in a variable
  const loggedUser = req.user._id;

  try {
    // we are checking if the body object contains any data
    if (!req.body) {
      res.status(404).json({
        success: false,
        message: "No workout data provided",
      });
    }

    // we are checking if the workout already exists
    const isWorkout = await Workout.findOne({ name, userId: loggedUser });
    if (isWorkout) {
      return res.status(500).json({
        success: false,
        message: "Workout already exists",
      });
    }

    // we are finding the user with a workout created
    let userWorkout = await UserWorkout.findOne({ userId: loggedUser });

    // if the user hadn't created any workouts we will create an object in database for that user
    if (!userWorkout) {
      userWorkout = await UserWorkout.create({
        userId: loggedUser,
      });
    }

    // we are creating new Workout for the logged user
    const newWorkout = new Workout({
      userId: loggedUser,
      name,
      muscle,
    });

    // if there is a new workout we will add it to the workouts array
    if (newWorkout) {
      userWorkout.workouts.push(newWorkout._id);
    }

    // saving in database
    await userWorkout.save();
    await newWorkout.save();

    res.status(201).json({
      success: true,
      message: "Workout Added Successfully",
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: `Unable to add workout: ${error}`,
    });
  }
};

// this route controller will get all the user workout he/she has created
export const getUserWorkout = async (req, res) => {
  const loggedUser = req.user._id;

  try {
    // checking if the user is logged in
    if (!loggedUser) {
      throw new Error();
    }

    // this code will execute if the user is logged in

    // we will find all the workout associated with the logged user id
    const allWorkouts = await Workout.find({ userId: loggedUser });

    // we are checking if there is no workout found
    if (allWorkouts.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No workouts found",
      });
    }

    res.json({
      success: true,
      message: "We found some workouts for this user",
      data: allWorkouts,
    });
  } catch (error) {
    res.json({
      success: false,
      message: `Unable to get workouts: ${error.message}`,
    });
  }
};

// TODO: make this api faster
export const deleteWorkout = async (req, res) => {
  // FIXME: when doin fronnt end we will change this line to req.params.workoutId
  const workoutName = req.body.name;
  const loggedUser = req.user._id;

  try {
    if (!loggedUser || !workoutName) throw new Error();

    const userWorkout = await Workout.findOne({
      userId: loggedUser,
      name: workoutName,
    });

    const workoutId = userWorkout._id;

    const deletedWorkout = await Workout.findByIdAndDelete(workoutId);
    const deleteUserWorkout = await UserWorkout.updateOne(
      { userId: loggedUser },
      { $pull: { workouts: workoutId } }
    );

    if (deleteUserWorkout && deletedWorkout) {
      return res.status(202).json({
        success: true,
        message: "Workout Deleted Successfully",
      });
    } else {
      return res.status(500).json({
        success: false,
        message: "Unable to delete workout",
      });
    }
  } catch (error) {
    res.status(404).json({
      success: false,
      message: `Unable to delete workout: ${error.message}`,
    });
  }
};
