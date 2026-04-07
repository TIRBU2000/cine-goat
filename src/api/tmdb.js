const key = import.meta.env.VITE_TMDB_API_KEY;
const baseURL = "https://api.themoviedb.org/3";

export async function getTrendingMovies() {
  try {
    const url = `${baseURL}/trending/movie/day?api_key=${key}&language=fr-FR`; //on prend l'URL de base de l'api et on lui ajoute ce qu'on veut faire (avoir les films trending ici)
    const response = await fetch(url);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Erreur avec l'API TMDB : ", error);
    return [];
  }
}

export async function searchMovies(query){
  try{
    const url = `${baseURL}/search/movie?api_key=${key}&language=fr-FR&query=${query}`;
    const response = await fetch(url); 
    const data = await response.json() ; 
    
    return data.results ; 

  }catch(error){
    console.error("Erreur avec l'API TMDB : ", error);
    return [];


  }}


export async function getMovieDetails(movieID) {
  try {
    const url = `${baseURL}/movie/${movieID}?api_key=${key}&language=fr-FR`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erreur avec l'API TMDB : ", error);
    return null;
  }
}
