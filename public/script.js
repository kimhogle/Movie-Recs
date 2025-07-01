const TMDB_API_KEY = 'YOUR_API_KEY'; // Replace with real key
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const VOTE_LIMIT = 30;


const response = await fetch('/api/movie'); // No API key exposed
if (!response.ok) {
  throw new Error('Network response was not ok');
}

// Initialize variables
let currentRound = 0;
let voteCount = 0;
let genreVotes = {};




const genreNameMap = {
  28: 'Action',
  12: 'Adventure',
  16: 'Animation',
  35: 'Comedy',
  80: 'Crime',
  99: 'Documentary',
  18: 'Drama',
  10751: 'Family',
  14: 'Fantasy',
  36: 'History',
  27: 'Horror',
  10402: 'Music',
  9648: 'Mystery',
  10749: 'Romance',
  878: 'Sci-Fi',
  10770: 'TV Movie',
  53: 'Thriller',
  10752: 'War',
  37: 'Western'
};






async function fetchRandomMovies() {
  const res = await fetch(`${TMDB_BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}`);
  const data = await res.json();
  const [movie1, movie2] = data.results.sort(() => 0.5 - Math.random()).slice(0, 2);
  displayMovies(movie1, movie2);
}

function displayMovies(movie1, movie2) {
  const card1 = document.getElementById('movie1');
  const card2 = document.getElementById('movie2');

  card1.innerHTML = getMovieHTML(movie1);
  card2.innerHTML = getMovieHTML(movie2);

  card1.onclick = () => handleVote(movie1);
  card2.onclick = () => handleVote(movie2);

  updateRoundCount();
}

function getMovieHTML(movie) {
  return `
    <h3>${movie.title}</h3>
    <img src="https://image.tmdb.org/t/p/w300${movie.poster_path}" alt="${movie.title}" />
    <p>${movie.overview}</p>
  `;
}

function handleVote(selectedMovie) {
  selectedMovie.genre_ids.forEach(id => {
    genreVotes[id] = (genreVotes[id] || 0) + 1;
  });

  voteCount++;
  if (voteCount < VOTE_LIMIT) {
    fetchRandomMovies();
  } else {
    showResults();
  }
}

function updateRoundCount() {
  document.getElementById('round-count').textContent = `Round ${voteCount + 1} of ${VOTE_LIMIT}`;
}

async function showResults() {
  document.getElementById('game-container').classList.add('hidden');
  document.getElementById('results-section').classList.remove('hidden');

  const topGenres = Object.entries(genreVotes)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(entry => entry[0]);

  const recommendations = await fetchRecommendations(topGenres);
  displayRecommendations(recommendations);
}

async function fetchRecommendations(genreIds) {
  const genreParam = genreIds.join(',');
  const res = await fetch(`${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&with_genres=${genreParam}`);
  const data = await res.json();
  return data.results.slice(0, 5);
}

function displayRecommendations(movies) {
  const container = document.getElementById('recommendations');
  container.innerHTML = movies.map(movie => `
    <div class="movie-card">
      <h4>${movie.title}</h4>
      <img src="https://image.tmdb.org/t/p/w300${movie.poster_path}" alt="${movie.title}" />
    </div>
  `).join('');
}

fetchRandomMovies();


function renderGenreChart(genreMap) {
  const genreLabels = [];
  const genreCounts = [];

  for (const [genreId, count] of Object.entries(genreMap)) {
    genreLabels.push(genreNameMap[genreId] || `Genre ${genreId}`);
    genreCounts.push(count);
  }

  new Chart(document.getElementById('genreBarChart'), {
    type: 'bar',
    data: {
      labels: genreLabels,
      datasets: [{
        label: 'Votes per Genre',
        data: genreCounts,
        backgroundColor: '#ffa600',
        borderColor: '#fff',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
        title: {
          display: true,
          text: 'Your Genre Preferences'
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: { stepSize: 1 }
        }
      }
    }
  });
}


renderGenreChart(genreVotes);
