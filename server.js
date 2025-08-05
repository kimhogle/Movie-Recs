"use strict";




require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
const PORT = process.env.PORT || 8080;


// Middleware
app.use(cors());
app.use(express.static("./public"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static("public")); // ✅ Serve index.html and index.js from /public
app.listen(PORT, () => {
    console.log(`Server is running http://localhost:${PORT}`);
    console.log("Press Ctrl+C to end this process.");
});













// 🧠 Server route that securely uses the API key
app.get("/api/movies/favorites", async (req, res) => {
  const apiKey = process.env.TMDB_API_KEY;

  const endpoint = `https://api.themoviedb.org/3/account/${accountId}/favorite/movies?api_key=${apiKey}`;

  try {
    const response = await fetch(endpoint);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch favorite movies" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});



// ✅ Route: Get popular movies
app.get("/api/movies/popular", async (req, res) => {
  const apiKey = process.env.TMDB_API_KEY;
  const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch popular movies" });
  }
});

// ✅ Route: Get favorite movies
app.get("/api/movies/favorites", async (req, res) => {
  const apiKey = process.env.TMDB_API_KEY;
  const accountId = process.env.TMDB_ACCOUNT_ID;

  const endpoint = `https://api.themoviedb.org/3/account/${accountId}/favorite/movies?api_key=${apiKey}`;

  try {
    const response = await fetch(endpoint);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch favorite movies" });
  }
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});