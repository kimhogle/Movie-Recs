// ✅ Fetch top-rated movies
fetch("/api/movies/top-rated")
  .then((res) => res.json())
  .then((data) => {
    const randomIndex = Math.floor(Math.random() * data.results.length);
    const randomMovie = data.results[randomIndex];
    const randomMovieElement = document.getElementById("random-movie");
    randomMovieElement.textContent = `Random pick: ${randomMovie.title} (${randomMovie.release_date})`;
  })
  .catch((error) => console.error("Error fetching movies:", error));

// ✅ Game Variables
let moviePool = [];
let winners = [];
let round = 1;
const maxRounds = 30;

const movieA = document.getElementById("movie-a");
const movieB = document.getElementById("movie-b");
const roundCounter = document.getElementById("round-counter");
const winnerLog = document.getElementById("winner-log");

// ✅ Fetch top-rated movies for face-off
fetch("/api/movies/top-rated")
  .then((res) => res.json())
  .then((data) => {
    moviePool = [...data.results];
    startFaceOff();
  })
  .catch((err) => console.error("Error:", err));

// ✅ Pick two random movies
function pickTwoRandomMovies() {
  const shuffled = moviePool.sort(() => 0.5 - Math.random());
  return [shuffled[0], shuffled[1]];
}

// ✅ Render movie cards
function renderMovie(container, movie) {
  container.innerHTML = `
    <h2>${movie.title}</h2>
    <p>Released: ${movie.release_date}</p>
    <img src="https://image.tmdb.org/t/p/w300${movie.poster_path}" alt="${movie.title}" style="max-width:100%">
  `;
}

// ✅ Start Face-Off
function startFaceOff() {
  if (round > maxRounds || moviePool.length < 2) {
    showResults();
    return;
  }

  const [a, b] = pickTwoRandomMovies();
  renderMovie(movieA, a);
  renderMovie(movieB, b);

  roundCounter.textContent = `Round ${round} of ${maxRounds}`;

  movieA.onclick = () => {
    winners.push(a);
    round++;
    startFaceOff();
  };
  movieB.onclick = () => {
    winners.push(b);
    round++;
    startFaceOff();
  };
}

// ✅ Fetch Recommendations
async function fetchRecommendations() {
  const recommendationSet = new Map();

  for (let movie of winners) {
    const response = await fetch(`/api/movies/recommendations/${movie.id}`);
    const data = await response.json();

    data.results.forEach(rec => {
      if (!recommendationSet.has(rec.id)) {
        recommendationSet.set(rec.id, rec);
      }
    });
  }

  return Array.from(recommendationSet.values());
}

// ✅ Show Results & Chart
function showResults() {
  movieA.style.display = "none";
  movieB.style.display = "none";
  roundCounter.textContent = "Face-Off Complete!";
  winnerLog.innerHTML = `<h3>Your Picks:</h3><ol>${winners
    .map((m) => `<li>${m.title}</li>`)
    .join("")}</ol>`;

  // ✅ Chart
  const chartCanvas = document.getElementById("resultsChart");
  chartCanvas.style.display = "block";

  const counts = winners.reduce((acc, movie) => {
    acc[movie.title] = (acc[movie.title] || 0) + 1;
    return acc;
  }, {});

  const labels = Object.keys(counts);
  const data = Object.values(counts);

  if (window.resultsChartInstance) {
    window.resultsChartInstance.destroy();
  }

  const ctx = chartCanvas.getContext("2d");
  window.resultsChartInstance = new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Votes",
          data: data,
          backgroundColor: "#9900f1ff",
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: "Your Movie Face-Off Results",
          font: { size: 18 },
        },
        legend: { display: false },
      },
      scales: {
        y: { beginAtZero: true },
      },
    },
  });

  // ✅ Play Again Button
  const playAgainBtn = document.getElementById("play-again-btn");
  playAgainBtn.style.display = "inline-block";
  playAgainBtn.addEventListener("click", () => {
    window.location.reload();
  });

  // ✅ Show Recommendations
  fetchRecommendations().then(recommendations => {
    const recContainer = document.getElementById("recommendations");
    recContainer.innerHTML = "<h3>Recommended Movies for You:</h3>";

    recommendations.slice(0, 10).forEach(movie => {
      const div = document.createElement("div");
      div.classList.add("recommendation-card");
      div.innerHTML = `
        <h4>${movie.title}</h4>
        <img src="https://image.tmdb.org/t/p/w200${movie.poster_path}" alt="${movie.title}">
      `;
      recContainer.appendChild(div);
    });
  });
}

// ✅ Dark Mode Toggle
const toggleBtn = document.getElementById("mode-toggle");
const root = document.documentElement;

if (localStorage.getItem("theme") === "dark") {
  root.classList.add("dark-mode");
  toggleBtn.textContent = "☀️ Light Mode";
} else {
  toggleBtn.textContent = "🌙 Dark Mode";
}

toggleBtn.addEventListener("click", () => {
  root.classList.toggle("dark-mode");
  const isDark = root.classList.contains("dark-mode");
  toggleBtn.textContent = isDark ? "☀️ Light Mode" : "🌙 Dark Mode";
  localStorage.setItem("theme", isDark ? "dark" : "light");
});
