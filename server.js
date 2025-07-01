"use strict";

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.static("public"));

// Proxy TMDB popular movies
app.get("/api/movies/popular", async (req, res) => {
  try {
    const tmdbResponse = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_API_KEY}`);
    const data = await tmdbResponse.json();
    res.json(data);
  } catch (error) {
    console.error("TMDB Fetch Error:", error);
    res.status(500).json({ error: "Failed to fetch movie data." });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
