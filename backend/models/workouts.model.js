import mongoose from "mongoose";

const workoutSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  muscle: {
    type: String,

  },
  instructions: {
    type: String,
    
  },
  equipment: {
    type: String,
  },
});

const Workout = mongoose.model("Workout", workoutSchema);
export default Workout;