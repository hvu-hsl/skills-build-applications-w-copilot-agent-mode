import mongoose from 'mongoose';

const workoutSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    difficulty: { type: String, default: 'Beginner' },
  },
  { timestamps: true }
);

export const Workout = mongoose.model('Workout', workoutSchema);

export default Workout;
