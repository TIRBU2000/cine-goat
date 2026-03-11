const key = import.meta.env.VITE_TMDB_API_KEY;
const baseURL = "https://api.themoviedb.org/3";

export async function getTrendingMovies() {
  try {
    const url = `${baseURL}/trending/movie/day?api_key=${key}&language=fr-FR`;
    const response = await fetch(url);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Erreur avec l'API TMDB : ", error);
    return [];
  }
}
