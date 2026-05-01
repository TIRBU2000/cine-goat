import "./style.css";

import { auth, db } from "./config/firebase.js";
import { createMovieCard } from "./components/movieCard.js";
import {
  getTrendingMovies,
  searchMovies,
  getMovieDetails,
} from "./api/tmdb.js";
import { collection, addDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";

import { createMovieDetails } from "./components/movieDetails.js";


import { add } from "firebase/firestore/pipelines";

// Fonctions pour toi alex : cadeau
export function afficherModeConnecte() {
  const btnAuth = document.getElementById("aller_log_btn");
  const dot = document.getElementById("auth-status-dot");

  btnAuth.textContent = "Se déconnecter";
  btnAuth.style.borderColor = "var(--danger-color)";

  dot.style.backgroundColor = "var(--success-color)"; // Le point passe au vert 
  dot.style.boxShadow = "0 0 8px var(--success-color)";
}

// Celle là aussi
export function afficherModeDeconnecte() {
  const btnAuth = document.getElementById("aller_log_btn");
  const dot = document.getElementById("auth-status-dot");

  btnAuth.textContent = "Log In / Sign Up";
  btnAuth.style.borderColor = "var(--primary-color)";

  dot.style.backgroundColor = "var(--danger-color)"; // Le point repasse au rouge
  dot.style.boxShadow = "0 0 8px var(--danger-color)";
}


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
  const aller_log_btn = document.getElementById("aller_log_btn");
  const authSection = document.getElementById("auth-section");
  const retour_btn = document.getElementById("retour-btn");
  const search = document.querySelector(".search-section");
  const message_reussi = document.getElementById("message_r");
  const message_echoue = document.getElementById("message_e");

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
    const criticForm = document.getElementById("critic-form");
    criticForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (auth.currentUser == null) {
        message_echoue.style.display = "flex";
        const message = message_echoue.querySelector("p");
        message.textContent = "Veuillez vous connnecter avant de poster une critique";
        return
      }

      const movieid = criticForm.dataset.movieId;
      const criticNote = document.getElementById("critic-note");
      const criticText = document.getElementById("critic-text");
      const nouvelleCritique = {
        id: movieid,
        note: Number(criticNote.value),
        text: criticText.value,
        userId: auth.currentUser.uid,
        userEmail: auth.currentUser.email,
        date: new Date().toISOString()
      };
      try {
        await addDoc(collection(db, "critiques"), nouvelleCritique);
        message_reussi.style.display = "flex";
        const message = message_reussi.querySelector("p");
        message.textContent = "Critique publiée avec succès !";
        criticForm.reset();
      }
      catch (error) {
        message_echoue.style.display = "flex";
        const message = message_echoue.querySelector("p");
        message.textContent = "Erreur de l'envoi de la critique";
        console.error("Erreur d'envoi :", error);
      }


    });

    const backBtn = document.getElementById("back-btn");
    backBtn.addEventListener("click", () => {
      detailsSection.style.display = "none";
      gridSection.style.display = "grid";
      sectionTitle.style.display = "none";
      searchTitle.style.display = "block";
    });
  });


  const btn_m_reussi = document.getElementById("fermer-message-r")
  const btn_m_echoue = document.getElementById("fermer-message-e")

  btn_m_reussi.addEventListener("click", async () => {
    message_reussi.style.display = "none";

  })
  btn_m_echoue.addEventListener("click", async () => {
    message_echoue.style.display = "none";

  })

  aller_log_btn.addEventListener("click", async () => {
    gridSection.style.display = "none";
    sectionTitle.style.display = "none";
    search.style.display = "none";
    searchTitle.style.display = "none";
    authSection.style.display = "block";

  })

  retour_btn.addEventListener("click", async () => {
    authSection.style.display = "none";
    search.style.display = "flex";
    gridSection.style.display = "grid";
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



  const login_btn = document.getElementById("login-btn");
  const signup_btn = document.getElementById("signup-btn");

  signup_btn.addEventListener("click", async () => {


    const email_in = document.getElementById("auth-email").value;
    const mot_de_passe_in = document.getElementById("auth-password").value;


    try {

      const reponse = await createUserWithEmailAndPassword(auth, email_in, mot_de_passe_in);

      console.log("Compte créé avec succès !", reponse.user);
      retour_btn.click();
      message_reussi.style.display = "flex";
      const message = message_echoue.querySelector("p");
      message.textContent = "Vous êtes maintenant connecté au CinéGOAT !";

    } catch (error) {

      retour_btn.click();
      message_echoue.style.display = "flex";
      const message = message_echoue.querySelector("p");
      message.textContent = "Erreur lors de l'inscription/connexion veuillez réessayer !";
      console.error("Firebase a refusé l'inscription :", error.message);
    }

  }

  );








  login_btn.addEventListener("click", async () => {

    if ((mail != "") & (mdp != "")) {



    }


  })




}





initTrending();
