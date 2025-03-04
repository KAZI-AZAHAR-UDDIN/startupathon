import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import connectDB from './config/db.js';
import challenges from './routes/api/challenges.js';
import completers from './routes/api/completers.js';
import founders from './routes/api/founders.js';
import subscribers from './routes/api/subscribers.js';
import path from "path";

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/challenges', challenges);
app.use('/api/completers', completers);
app.use('/api/founders', founders);
app.use('/api/subscribers', subscribers);
// Add other routes similarly


// Serve React static files in production
if (process.env.NODE_ENV === "production") {
  // Set up the static file serving for the frontend
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  // Handle all routes by sending the index.html file of the React app
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => 
  console.log(`Server running on port ${PORT}`));


