import mongoose from 'mongoose';

const leaderboardSchema = new mongoose.Schema(
  {
    team: { type: String, required: true },
    points: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

export const Leaderboard = mongoose.model('Leaderboard', leaderboardSchema);

export default Leaderboard;
