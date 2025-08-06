// ✅ Fetch popular movies from your own backend
fetch("/api/movies/popular")
  .then((res) => res.json())
  .then((data) => {
    const movieList = document.getElementById("movie-list");
    // Show the random movie title on the page
const randomMovieElement = document.getElementById("random-movie");
randomMovieElement.textContent = `Random pick: ${randomMovie.title} (${randomMovie.release_date})`;
 

    // Display all movies in a list
    data.results.forEach((movie) => {
      const li = document.createElement("li");
      li.textContent = `${movie.title} (${movie.release_date})`;
      movieList.appendChild(li);
    });

   // ✅ Pick a random movie
    const randomIndex = Math.floor(Math.random() * data.results.length);
    const randomMovie = data.results[randomIndex];
    console.log("🎬 Random movie:", randomMovie);
  })
  .catch((error) => {
    console.error("Error fetching movies:", error);
  });



let moviePool = [];
let winners = [];
let round = 1;
const maxRounds = 30;

const movieA = document.getElementById("movie-a");
const movieB = document.getElementById("movie-b");
const roundCounter = document.getElementById("round-counter");
const winnerLog = document.getElementById("winner-log");

// Fetch movies from your server
fetch("/api/movies/popular")
  .then((res) => res.json())
  .then((data) => {
    moviePool = [...data.results]; // Clone the movie list
    startFaceOff();
  })
  .catch((err) => console.error("Error:", err));

function startFaceOff() {
  if (round > maxRounds || moviePool.length < 2) {
    showResults();
    return;
  }

  // Pick two random movies
  const [a, b] = pickTwoRandomMovies();
  renderMovie(movieA, a);
  renderMovie(movieB, b);

  // Update round display
  roundCounter.textContent = `Round ${round} of ${maxRounds}`;

  // Set up click listeners
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

function pickTwoRandomMovies() {
  const shuffled = moviePool.sort(() => 0.5 - Math.random());
  return [shuffled[0], shuffled[1]];
}

function renderMovie(container, movie) {
  container.innerHTML = `
    <h2>${movie.title}</h2>
    <p>Released: ${movie.release_date}</p>
    <img src="https://image.tmdb.org/t/p/w300${movie.poster_path}" alt="${movie.title}" style="max-width:100%">
  `;
}

function showResults() {
  movieA.style.display = "none";
  movieB.style.display = "none";
  roundCounter.textContent = "Face-Off Complete!";
  winnerLog.innerHTML = `<h3>Your Picks:</h3><ol>${winners
    .map((m) => `<li>${m.title}</li>`)
    .join("")}</ol>`;








  // ✅ Show the canvas
  const chartCanvas = document.getElementById("resultsChart");
  chartCanvas.style.display = "block";

  // ✅ Prepare data for chart
  const counts = winners.reduce((acc, movie) => {
    acc[movie.title] = (acc[movie.title] || 0) + 1;
    return acc;
  }, {});

  const labels = Object.keys(counts);
  const data = Object.values(counts);

  console.log("Chart labels:", labels);
  console.log("Chart data:", data);

  // ✅ Destroy previous chart if exists
  if (window.resultsChartInstance) {
    window.resultsChartInstance.destroy();
  }

  // ✅ Create new chart
  const ctx = chartCanvas.getContext("2d");
  window.resultsChartInstance = new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Votes",
          data: data,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: "Your Movie Face-Off Results",
          font: {
            size: 18,
          },
        },
        legend: { display: false },
      },
      scales: {
        y: { beginAtZero: true },
      },
    },
  });
}





// ✅ Show "Play Again" button
const playAgainBtn = document.getElementById('play-again-btn');

// When results are ready and shown:
playAgainBtn.style.display = 'inline-block';  // or 'block' depending on layout
playAgainBtn.addEventListener('click', () => {
  window.location.reload();
});






// ✅ Dark mode toggle
const toggleBtn = document.getElementById("mode-toggle");
const root = document.documentElement; // this refers to <html> / :root

// 🔄 Load saved theme preference on page load
if (localStorage.getItem("theme") === "dark") {
  root.classList.add("dark-mode");
  toggleBtn.textContent = "☀️ Light Mode";
} else {
  toggleBtn.textContent = "🌙 Dark Mode";
}

// 🌗 Toggle theme on button click
toggleBtn.addEventListener("click", () => {
  root.classList.toggle("dark-mode");

  const isDark = root.classList.contains("dark-mode");
  toggleBtn.textContent = isDark ? "☀️ Light Mode" : "🌙 Dark Mode";
  localStorage.setItem("theme", isDark ? "dark" : "light");
});
