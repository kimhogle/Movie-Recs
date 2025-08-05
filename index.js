"use strict"

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


setTimeout(loopThroughMovies, 3000);