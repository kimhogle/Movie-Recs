async function getRandomMovie() {
    const account_id = "TMDB_API_KEY";
    const endpoint = `https://api.themoviedb.org/3/account/{account_id}/favorite/movies`;
    try {
        const response = await fetch(endpoint);
        const returnedData = await response.json()
        console.log(returnedData)
    } catch (error) {
        console.error(error)
    }
}


fetch("/api/movies/popular")
  .then(res => res.json())
  .then(data => {
    console.log(data);
    // handle the popular movies data
  });
async function getRandomMovie() {
  try {
    const response = await fetch("/api/movies/favorites");
    const returnedData = await response.json();
    console.log(returnedData);
  } catch (error) {
    console.error(error);
  }
}



getRandomMovie();

/*"use strict"

const elements = {
    title: document.getElementById("title"),
    year: document.getElementById("year"),
};

const movies = [
    {
        title: "Jawbreaker",
        year: "2000",
    },

    {
        title: "Jawbreaker 2",
        year: "2000",
    },

    {
        title: "Jawbreaker 3",
        year: "2000",
    }
]







function loopThroughMovies() {
    let movieIndex = 0;
    setInterval(() => {
        if (movieIndex < movies.length) {
            elements.title.textContent = movies[movieIndex].title;
            elements.year.textContent = movies[movieIndex].year;
            movieIndex++;
        } else {
            movieIndex = 0;
        }
    }, 3000);
}


setTimeout(loopThroughMovies, 3000); */