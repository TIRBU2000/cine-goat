import "./style.css";

import { auth, db } from "./config/firebase.js";
import { createMovieCard } from "./components/movieCard.js";
import {
  getTrendingMovies,
  searchMovies,
  getMovieDetails,
} from "./api/tmdb.js";

import { createUserWithEmailAndPassword } from "firebase/auth";

import { createMovieDetails } from "./components/movieDetails.js";


import { add } from "firebase/firestore/pipelines";

async function initTrending() {
  const movie_grid = document.getElementById("movies_grid");
  const movies = await getTrendingMovies();
  const sectionTitle = document.querySelector(".section-title");
  const searchTitle = document.querySelector(".search-title");


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
      sectionTitle.style.display = "none";
      searchTitle.style.display = "block";

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
    sectionTitle.style.display = "none";
    searchTitle.style.display = "none";


    detailsSection.innerHTML = "<p>Chargement des détails...</p>";

    const movieDetails = await getMovieDetails(movieId);

    const detailsContent = createMovieDetails(movieDetails);

    detailsSection.innerHTML = "";
    detailsSection.appendChild(detailsContent);

    const backBtn = document.getElementById("back-btn");
    backBtn.addEventListener("click", () => {
      detailsSection.style.display = "none";
      gridSection.style.display = "grid";
      sectionTitle.style.display = "none";
      searchTitle.style.display = "block";
    });
  });

  const aller_log_btn = document.getElementById("aller_log_btn") ; 
  const authSection = document.getElementById("auth-section") ; 
  const retour_btn = document.getElementById("retour-btn") ; 
  const search = document.querySelector(".search-section") ; 
  const message_reussi  = document.getElementById("message_r") ; 
  const message_echoue  = document.getElementById("message_e") ; 

  const btn_m_reussi = document.getElementById("fermer-message-r")
  const btn_m_echoue = document.getElementById("fermer-message-e")

    btn_m_reussi.addEventListener("click", async()=>{
      message_reussi.style.display = "none" ; 

    })
    btn_m_echoue.addEventListener("click", async()=>{
      message_echoue.style.display = "none" ; 

    })

    aller_log_btn.addEventListener("click", async()=>{
    gridSection.style.display = "none" ; 
    sectionTitle.style.display = "none";
    search.style.display = "none" ; 
    searchTitle.style.display = "none";
    authSection.style.display = "block" ; 

  })
  
    retour_btn.addEventListener("click", async()=>{
    authSection.style.display = "none" ; 
    search.style.display = "flex" ; 
    gridSection.style.display = "grid" ;
    sectionTitle.style.display = "block";
    searchTitle.style.display = "none";
  })
  const logo = document.getElementById("logo");
  
  logo.addEventListener("click", async () => {
    
    
    document.getElementById("auth-section").style.display = "none"; 
    document.getElementById("movie-details-section").style.display = "none";
    document.querySelector(".search-section").style.display = "flex"; 
    document.getElementById("movies_grid").style.display = "grid";
    
    
    sectionTitle.style.display = "block"; 
    searchTitle.style.display = "none";   

    
    const search_input = document.getElementById("search_input");
    search_input.value = ""; 

   
    const movie_grid = document.getElementById("movies_grid");
    movie_grid.innerHTML = "";

   
    const movies = await getTrendingMovies();
    movies.forEach((movie) => {
      const card = createMovieCard(movie);
      movie_grid.appendChild(card);
    });
  });
  


  const login_btn = document.getElementById("login-btn") ; 
  const signup_btn = document.getElementById("signup-btn") ; 

  signup_btn.addEventListener("click", async () => {
  
  
  const email_in = document.getElementById("auth-email").value;
  const mot_de_passe_in = document.getElementById("auth-password").value; 


  try {
    
    const reponse = await createUserWithEmailAndPassword(auth, email_in, mot_de_passe_in);
    
    console.log("Compte créé avec succès !", reponse.user);
    retour_btn.click() ; 
    message_reussi.style.display = "flex" ; 

  } catch (error) {
    
    retour_btn.click() ; 
    message_echoue.style.display = "flex" ; 
    console.error("Firebase a refusé l'inscription :", error.message);
  }

}

);








  login_btn.addEventListener("click", async()=>{

    if ((mail != "") & (mdp != "")){
      


    }


  })




}





initTrending();
