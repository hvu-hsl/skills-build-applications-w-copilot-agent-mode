import express from 'express';
import cors from 'cors';
import db from './config/database.js';
import User from './models/User.js';
import Activity from './models/Activity.js';

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

db.once('open', () => {
  app.listen(port, () => {
    console.log(`OctoFit API listening on ${baseUrl}`);
  });
});

export { app, baseUrl, port };
