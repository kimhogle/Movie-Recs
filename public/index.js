// ✅ Fetch top-rated movies
fetch("/api/movies/top-rated")
  .then((res) => res.json())
  .then((data) => {
    const randomIndex = Math.floor(Math.random() * data.results.length);
    const randomMovie = data.results[randomIndex];
    const randomMovieElement = document.getElementById("random-movie");
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

// ✅ Fetch Recommendations based on similar movies (genre/content)
async function fetchRecommendations() {
  const genreCounts = {};
  const seenMovieIds = new Set([...moviePool.map(m => m.id), ...winners.map(m => m.id)]);

  // Count genres from winners to find the top genre
  for (const movie of winners) {
    const response = await fetch(`/api/movies/details/${movie.id}`);
    const data = await response.json();

    data.genres.forEach((genre) => {
      genreCounts[genre.id] = (genreCounts[genre.id] || 0) + 1;
    });
  }

  // Fetch similar movies for each winner
  const recommendationSet = new Map();

  for (const movie of winners) {
    try {
      const response = await fetch(`/api/movies/similar/${movie.id}`);
      const data = await response.json();

      data.results.forEach(rec => {
        if (!seenMovieIds.has(rec.id) && !recommendationSet.has(rec.id)) {
          recommendationSet.set(rec.id, rec);
        }
      });
    } catch (err) {
      console.error(`Failed to fetch similar movies for ID ${movie.id}`, err);
    }
  }

  return Array.from(recommendationSet.values()).slice(0, 10); // Top 10 unique recommendations
}






// ✅ Show Results & Chart
function showResults() {
  movieA.style.display = "none";
  movieB.style.display = "none";
  roundCounter.textContent = "Challenge completed! Results in the graph below.";

 // ✅ Genre Breakdown Chart
const genreCounts = {};
const genreLabelsMap = {};

Promise.all(winners.map(movie =>
  fetch(`/api/movies/details/${movie.id}`).then(res => res.json())
)).then(detailsArray => {
  detailsArray.forEach(detail => {
    detail.genres.forEach(genre => {
      genreCounts[genre.name] = (genreCounts[genre.name] || 0) + 1;
    });
  });

  const genreLabels = Object.keys(genreCounts);
  const genreData = Object.values(genreCounts);

  // Create a new container + canvas for the genre chart
  const genreContainer = document.createElement("div");
  genreContainer.className = "chart-container";

  const genreChartCanvas = document.createElement("canvas");
  genreChartCanvas.id = "genreChart";

  genreContainer.appendChild(genreChartCanvas);

  // Insert after the resultsChart container
  const resultsChartContainer = document.querySelector(".chart-container");
  resultsChartContainer.parentNode.insertBefore(genreContainer, resultsChartContainer.nextSibling);

  const genreCtx = genreChartCanvas.getContext("2d");
  new Chart(genreCtx, {
    type: "bar",
    data: {
      labels: genreLabels,
      datasets: [{
        label: "Votes by Genre",
        data: genreData,
        backgroundColor: "#f15025",
      }],
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: "Genre Breakdown of Your Picks",
          font: { size: 18 },
        },
        legend: { display: false },
      },
      scales: {
        y: { beginAtZero: true },
      },
    },
  });
});


  
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
    document.getElementById("instructions").style.display = "none";
    const recContainer = document.getElementById("recommendations");
recContainer.innerHTML = "<h3 class='rec-title'>Recommended Movies for You:</h3>";


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
  toggleBtn.textContent = "Light Mode";
} else {
  toggleBtn.textContent = "Dark Mode";
}

toggleBtn.addEventListener("click", () => {
  root.classList.toggle("dark-mode");
  const isDark = root.classList.contains("dark-mode");
  toggleBtn.textContent = isDark ? "Light Mode" : "Dark Mode";
  localStorage.setItem("theme", isDark ? "dark" : "light");
});
