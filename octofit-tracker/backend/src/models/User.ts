import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    team: { type: String },
  },
  { timestamps: true }
);

export const User = mongoose.model('User', userSchema);

export default User;
