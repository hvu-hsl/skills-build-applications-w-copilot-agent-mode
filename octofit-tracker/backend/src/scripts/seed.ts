import mongoose from 'mongoose';
import User from '../models/User.js';
import Activity from '../models/Activity.js';
import Team from '../models/Team.js';
import Leaderboard from '../models/Leaderboard.js';
import Workout from '../models/Workout.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await User.deleteMany({});
    await Activity.deleteMany({});
    await Team.deleteMany({});
    await Leaderboard.deleteMany({});
    await Workout.deleteMany({});

    const users = await User.insertMany([
      { email: 'thundergod@mhigh.edu', name: 'Thunder God', team: 'Blue' },
      { email: 'metalgeek@mhigh.edu', name: 'Metal Geek', team: 'Blue' },
      { email: 'zerocool@mhigh.edu', name: 'Zero Cool', team: 'Gold' },
    ]);

    await Activity.insertMany([
      { user: users[0]._id, type: 'Cycling', durationMinutes: 60 },
      { user: users[1]._id, type: 'Crossfit', durationMinutes: 120 },
      { user: users[2]._id, type: 'Running', durationMinutes: 90 },
    ]);

    await Team.insertMany([
      { name: 'Blue', members: [users[0]._id, users[1]._id] },
      { name: 'Gold', members: [users[2]._id] },
    ]);

    await Leaderboard.insertMany([
      { team: 'Blue', points: 180 },
      { team: 'Gold', points: 90 },
    ]);

    await Workout.insertMany([
      { name: 'Cycling Training', description: 'Sprint intervals on the bike', difficulty: 'Intermediate' },
      { name: 'Crossfit', description: 'Full body strength circuit', difficulty: 'Advanced' },
      { name: 'Running Training', description: 'Steady 5K endurance run', difficulty: 'Beginner' },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
