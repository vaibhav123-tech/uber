// app.js
const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
const app = express();

const user_routes = require('./routes/user_routes');
const captain_routes = require('./routes/captain_routes');
const maps_routes = require('./routes/maps_routes');
const ride_routes = require('./routes/ride.routes');

// Configure allowed origins via env var
// You can provide a comma-separated list in FRONTEND_URL if you have multiple
const FRONTENDS = (process.env.FRONTEND_URL || '')
  .split(',')
  .map(s => s.trim())
  .filter(Boolean);

// helper to check allowed origins (also allow vercel preview domains optionally)
const isAllowedOrigin = origin => {
  if (!origin) return true; // allow server-to-server or curl without origin
  if (FRONTENDS.includes(origin)) return true;
  if (origin.endsWith('.vercel.app')) return true; // allow Vercel preview domains (optional)
  return false;
};

// CORS options
const corsOptions = {
  origin: (origin, callback) => {
    if (isAllowedOrigin(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'), false);
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

// use CORS before routes and before socket initialisation
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use('/maps', maps_routes);
app.use('/users', user_routes);
app.use('/captain', captain_routes);
app.use('/rides', ride_routes);

module.exports = app;
