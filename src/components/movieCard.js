export function createMovieCard(movie) {
  const title = movie.title;
  const avgRating = movie.vote_average.toFixed(1);
  const image = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  const releaseDate = movie.release_date;
  const card = document.createElement("div");
  card.className = "movie-card";
  card.innerHTML = `<h1>${title}</h1><p>Note moyenne : ${avgRating}</p><p>Date de sortie : ${releaseDate}</p><img src="${image}" alt="${title}">`;
  return card;
}
