import axios from "axios";
import Workout from "../models/workouts.model.js";
import UserWorkout from "../models/user.workout.model.js";


// px5d3cstj imagekit id


// features to add in workout planners
//  User authentication
//  Create, edit, and delete workouts
//  Reorder exercises with drag-and-drop
//  Custom exercise selector
// Upcoming features
//  Exercises with muscle activation information
//  Workout tracking
//  Workout splits
//  Public workout feed
// add limit to workout list based on a muscle type
const obj = [
    {
        name: 'bicep curls',
        muscle: 'biceps'
    },
    {
        name: 'triceps curls',
        muscle: 'triceps'
    }
]

export const allWorkouts = async (req, res) => {
  const options = {
    method: "GET",
    url: "https://exercises-by-api-ninjas.p.rapidapi.com/v1/exercises",
    params: {
        muscle: 'biceps',
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
        data: response.data
    })
  }catch (error) {
    res.status(404).json({
        success: false,
        message: `Unable to get workouts: ${error.message}`,
    })
  }
};

export const addWorkout = async (req, res) => {
    const {name, muscle} = req.body;
    const loggedUser = req.user._id;
    
    try{
        if(!req.body){
            res.status(404).json({
                success: false,
                message: 'No workout data provided',
            });
        }

        const isWorkout = await Workout.findOne({name})
        if(isWorkout){
            return res.status(500).json({
                success: false,
                message: 'Workout already exists',
            })
        }
        let userWorkout = await UserWorkout.findOne({userId: loggedUser})

        if (!userWorkout) {
            userWorkout = await UserWorkout.create({
                userId: loggedUser,
            })
        }

        const newWorkout = new Workout({
            userId: loggedUser,
            name,
            muscle,
        })

        if(newWorkout) {
            userWorkout.workouts.push(newWorkout._id);
        }

        await userWorkout.save();
        await newWorkout.save();

        res.status(201).json({
            success: true,
            message: "Workout Added Successfully"
        })


    }catch (error) {
        res.status(404).json({
            success: false,
            message: `Unable to add workout: ${error}`,
        })
    }
}
