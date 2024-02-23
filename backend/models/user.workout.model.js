import mongoose from 'mongoose';

const userWorkoutSchema = new mongoose.Schema({
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    workouts: [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref: 'Workout',
            default: []
        }
    ]
})

const UserWorkout = mongoose.model('UserWorkout', userWorkoutSchema);
export default UserWorkout;