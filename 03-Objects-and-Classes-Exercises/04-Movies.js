function printMovies(input) {
    let movies = [];

    input.forEach((command) => {
        if (command.includes("addMovie")) {
            const movieName = command.split("addMovie ").filter((element) => element)[0];
            movies.push({ name: movieName });
        }

        if (command.includes("directedBy")) {
            const arguments = command.split(" directedBy ").filter((element) => element);

            const movieName = arguments[0];
            const director = arguments[1];
            const movie = movies.find((m) => m.name === movieName);

            if (movie) {
                movie.director = director;
            }
        }

        if (command.includes("onDate")) {
            const arguments = command.split(" onDate ").filter((element) => element);

            const movieName = arguments[0];
            const onDate = arguments[1];
            const movie = movies.find((m) => m.name === movieName);

            if (movie) {
                movie.date = onDate;
            }
        }
    });

    movies.filter((movie) => movie.name && movie.director && movie.date).forEach((movie) => console.log(JSON.stringify(movie)));
}

printMovies([
    "addMovie The Avengers",
    "addMovie Superman",
    "The Avengers directedBy Anthony Russo",
    "The Avengers onDate 30.07.2010",
    "Captain America onDate 30.07.2010",
    "Captain America directedBy Joe Russo",
]);
