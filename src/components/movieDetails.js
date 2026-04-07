export function createMovieDetails(movie) {
  const title = movie.title;
  const avgRating = movie.vote_average.toFixed(1);
  const image = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  const releaseDate = movie.release_date;
  const overview = movie.overview;
  const detailsSection = document.createElement("div");
  detailsSection.className = "movie-details-content";
  detailsSection.innerHTML = `
    <button id="back-btn">⬅ Retour à l'accueil</button>
    <div class="details-layout">
      <img src="${image}" alt="${title}" class="details-poster">
      <div class="details-info">
        <h1>${title}</h1>
        <p class="rating">⭐ ${avgRating} / 10</p>
        <p class="date">📅 ${releaseDate}</p>
        <div class="overview">
          <h3>Synopsis</h3>
          <p>${overview}</p>
        </div>
      </div>
    </div>
  `;
  return detailsSection;
}
