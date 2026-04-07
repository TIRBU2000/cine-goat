import "./style.css";
import { auth, db } from "./config/firebase.js";
import { createMovieCard } from "./components/moviecard.js";
import {
  getTrendingMovies,
  searchMovies,
  getMovieDetails,
} from "./api/tmdb.js";
import { createMovieDetails } from "./components/movieDetails.js";

async function initTrending() {
  const movie_grid = document.getElementById("movies_grid");
  const movies = await getTrendingMovies();

  movies.forEach((movie) => {
    const card = createMovieCard(movie);
    movie_grid.appendChild(card);
  });

  const search_btn = document.getElementById("search_btn");
  const search_input = document.getElementById("search_input");

  search_btn.addEventListener("click", async () => {
    const query = search_input.value;
    if (query != "") {
      const search_results = await searchMovies(query);
      console.log("Films trouvés :", search_results);

      const movie_grid = document.getElementById("movies_grid");
      movie_grid.innerHTML = "";

      search_results.forEach((movie) => {
        const card = createMovieCard(movie);
        movie_grid.appendChild(card);
      });
    }
  });

  const gridSection = document.getElementById("movies_grid");
  const detailsSection = document.getElementById("movie-details-section");

  gridSection.addEventListener("click", async (event) => {
    const clickedCard = event.target.closest(".movie-card");

    if (!clickedCard) return;

    const movieId = clickedCard.dataset.movieId;

    gridSection.style.display = "none";
    detailsSection.style.display = "block";

    detailsSection.innerHTML = "<p>Chargement des détails...</p>";

    const movieDetails = await getMovieDetails(movieId);

    const detailsContent = createMovieDetails(movieDetails);

    detailsSection.innerHTML = "";
    detailsSection.appendChild(detailsContent);

    const backBtn = document.getElementById("back-btn");
    backBtn.addEventListener("click", () => {
      detailsSection.style.display = "none";
      gridSection.style.display = "grid";
    });
  });
}

initTrending();
