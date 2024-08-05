require('dotenv').config();
const express = require('express');
const path = require('path');
const ejs = require('ejs');
const collections = require('./mongodb');

const app = express();
const PORT = process.env.PORT || 1000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Serve the login page
app.get("/", (req, res) => {
  res.render("login");
});

// Serve the signup page
app.get("/signup", (req, res) => {
  res.render("signup");
});

// Handle login requests
app.post("/login", async (req, res) => {
  try {
    let { username, password } = req.body;

    if (!username || !password) {
      return res.render("login", { error: "Username and password are required." });
    }

    let user = await collections.findOne({ username });

    if (!user || user.password !== password) {
      return res.render("login", { error: "Invalid username or password." });
    }

    // Successful login
    res.render("home"); // Render the home page if credentials are correct
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error. Please try again later."); // Handle server errors
  }
});

// Handle signup requests
app.post("/signup", async (req, res) => {
  try {
    let { username, name, email, password } = req.body;

    // Check if all required fields are provided
    if (!username || !name || !email || !password) {
      return res.status(400).send("All fields are required.");
    }

    // Check if the user already exists
    let existingUser = await collections.findOne({ username });

    if (existingUser) {
      return res.status(400).send("Username already exists.");
    }

    // Insert new user into the database
    let data = { username, name, email, password };
    await collections.create(data); // Use create instead of insertMany for single document

    res.redirect("/"); // Redirect to the login page after successful signup
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating user."); // Handle server errors
  }
});

app.listen(1000, () => {
  console.log(`Server is running on port ${1000}`);
});
