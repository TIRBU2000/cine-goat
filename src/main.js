import './style.css';
import { auth, db } from './firebase.js';

// Préparation de l'écran de contrôle
document.querySelector('#app').innerHTML = `
  <div style="padding: 30px; font-family: sans-serif; background: #111; color: white; min-height: 100vh;">
    <h1>🐐 Système de Diagnostic Cine-Goat</h1>
    <ul id="log" style="font-size: 1.2rem; line-height: 2; list-style: none; padding: 0;"></ul>
  </div>
`;

const logEl = document.getElementById('log');
const printLog = (msg, isOk) => {
  logEl.innerHTML += `<li style="color: ${isOk ? '#4ade80' : '#f87171'}">${isOk ? '✅' : '❌'} ${msg}</li>`;
};

// 1. Test du fichier .env
const tmdbKey = import.meta.env.VITE_TMDB_API_KEY;
if (tmdbKey && tmdbKey.length > 10) {
  printLog("Clé TMDB détectée dans le .env", true);
} else {
  printLog("Clé TMDB absente ou invalide dans le .env", false);
}

// 2. Test de Firebase
if (auth && db) {
  printLog("Firebase (Auth & Database) initialisé avec succès", true);
} else {
  printLog("Erreur : Impossible de charger Firebase", false);
}

// 3. Test de l'API Films (TMDB)
if (tmdbKey) {
  fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${tmdbKey}&language=fr-FR`)
    .then(res => {
      if (!res.ok) throw new Error("Clé refusée");
      return res.json();
    })
    .then(data => {
      if (data.results && data.results.length > 0) {
        printLog(`Connexion TMDB réussie ! (Film N°1 actuel : "${data.results[0].title}")`, true);
      }
    })
    .catch(() => printLog("L'API TMDB a refusé la connexion (Vérifie ta clé VITE_TMDB_API_KEY)", false));
}