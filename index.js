const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const { v4: uuidv4 } = require("uuid");

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// In-memory storage
let users = [];

// Routes

// 1. Create new user
app.post("/api/users", (req, res) => {
  const { username } = req.body;
  if (!username) return res.json({ error: "Username is required" });

  const user = { username, _id: uuidv4() };
  users.push(user);
  res.json(user);
});

// 2. Get all users
app.get("/api/users", (req, res) => {
  res.json(users);
});

// 3. Add exercise
app.post("/api/users/:_id/exercises", (req, res) => {
  const { description, duration, date } = req.body;
  const user = users.find((u) => u._id === req.params._id);

  if (!user) return res.json({ error: "User not found" });

  const exerciseDate = date ? new Date(date) : new Date();
  const exercise = {
    description,
    duration: Number(duration),
    date: exerciseDate.toDateString(),
  };

  if (!user.log) user.log = [];
  user.log.push(exercise);

  res.json({
    username: user.username,
    _id: user._id,
    description: exercise.description,
    duration: exercise.duration,
    date: exercise.date,
  });
});

// 4. Get exercise log
app.get("/api/users/:_id/logs", (req, res) => {
  const { from, to, limit } = req.query;
  const user = users.find((u) => u._id === req.params._id);

  if (!user) return res.json({ error: "User not found" });

  let log = user.log || [];

  if (from) log = log.filter((e) => new Date(e.date) >= new Date(from));
  if (to) log = log.filter((e) => new Date(e.date) <= new Date(to));
  if (limit) log = log.slice(0, Number(limit));

  res.json({
    username: user.username,
    _id: user._id,
    count: log.length,
    log,
  });
});

// Listen
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Exercise Tracker API running on port ${PORT}`);
});
