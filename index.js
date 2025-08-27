console.log("Starting Exercise Tracker server...");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// In-memory storage
const users = [];

// Root route
app.get("/", (req, res) => {
  res.send("Exercise Tracker API is running 🚀");
});

// Create new user
app.post("/api/users", (req, res) => {
  const username = req.body.username;
  if (!username) return res.status(400).json({ error: "Username required" });

  const newUser = { username, _id: uuidv4() };
  users.push(newUser);
  res.json(newUser);
});

// Get all users
app.get("/api/users", (req, res) => {
  res.json(users);
});

// Add exercise to a user
app.post("/api/users/:_id/exercises", (req, res) => {
  const user = users.find((u) => u._id === req.params._id);
  if (!user) return res.status(404).json({ error: "User not found" });

  const { description, duration, date } = req.body;
  const exercise = {
    description,
    duration: Number(duration),
    date: date ? new Date(date).toDateString() : new Date().toDateString(),
  };

  if (!user.log) user.log = [];
  user.log.push(exercise);

  res.json({ ...user, ...exercise });
});

// Get exercise logs
app.get("/api/users/:_id/logs", (req, res) => {
  const user = users.find((u) => u._id === req.params._id);
  if (!user) return res.status(404).json({ error: "User not found" });

  let log = user.log || [];
  const { from, to, limit } = req.query;

  if (from) log = log.filter((e) => new Date(e.date) >= new Date(from));
  if (to) log = log.filter((e) => new Date(e.date) <= new Date(to));
  if (limit) log = log.slice(0, Number(limit));

  res.json({ username: user.username, count: log.length, _id: user._id, log });
});

// Listen on Sandbox's port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Exercise Tracker API is running on port ${PORT}`);
});
