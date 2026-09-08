import express from 'express';
import cors from 'cors';
import db from './config/database.js';
import User from './models/User.js';
import Activity from './models/Activity.js';
import Team from './models/Team.js';
import Leaderboard from './models/Leaderboard.js';
import Workout from './models/Workout.js';

const port = Number(process.env.PORT) || 8000;
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', baseUrl });
});

app.get('/api/users', async (_request, response) => {
  const users = await User.find().lean();
  response.json(users);
});

app.get('/api/activities', async (_request, response) => {
  const activities = await Activity.find().populate('user', 'name email').lean();
  response.json(activities);
});

app.get('/api/teams', async (_request, response) => {
  const teams = await Team.find().populate('members', 'name email').lean();
  response.json(teams);
});

app.get('/api/leaderboard', async (_request, response) => {
  const entries = await Leaderboard.find().sort({ points: -1 }).lean();
  response.json(entries);
});

app.get('/api/workouts', async (_request, response) => {
  const workouts = await Workout.find().lean();
  response.json(workouts);
});

db.once('open', () => {
  app.listen(port, () => {
    console.log(`OctoFit API listening on ${baseUrl}`);
  });
});

export { app, baseUrl, port };
