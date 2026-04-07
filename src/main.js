import "./style.css";
import { auth, db } from "./config/firebase.js";
import { createMovieCard } from "./components/moviecard.js";
import { getTrendingMovies, searchMovies } from "./api/tmdb.js";

async function initTrending() {
  const movie_grid = document.getElementById("movies_grid");
  const movies = await getTrendingMovies();

  movies.forEach((movie) => {
    const card = createMovieCard(movie);
    movie_grid.appendChild(card);
  });
}


const search_btn = document.getElementById("search_btn"); 
const search_input = document.getElementById("search_input") ; 

search_btn.addEventListener("click", async () => {
  
  const query = search_input.value ;   
  if (query != ""){
    const movies = await searchMovies(query) ; 
    console.log("Films trouvés :", movies)
  
  const movie_grid = document.getElementById("movies_grid") ; 
  movie_grid.innerHTML = "" ; 
  movies.forEach((movie)=>{
    const card = createMovieCard(movie); 
    movie_grid.appendChild(card) ; 


  })

  }
})

initTrending();
