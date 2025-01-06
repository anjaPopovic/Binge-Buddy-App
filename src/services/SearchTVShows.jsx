const API_KEY = "eeb1c44fe650e74018a688a685902f5e";
const BASE_URL = "https://api.themoviedb.org/3";

const searchTVShows = async (query) => {
  try {
    const response = await fetch(
      `${BASE_URL}/search/tv?api_key=${API_KEY}&language=en-US&page=1&include_adult=false&query=${query}`
    );
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error("Error fetching tv shows:", error);
    return [];
  }
};

export default searchTVShows;
