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
    required: true,
  },
  instructions: {
    type: String,
    required: true,
  },
  equipment: {
    type: String,
    required: true,
  },
});

const Workout = mongoose.model("Workout", workoutSchema);
export default Workout;