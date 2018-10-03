const API_KEY = '3dc190a9f2f35a9b9626a78f65a2bea6';
const BASE_URL = 'https://api.themoviedb.org/3/'; 
export default {
	search: BASE_URL + 'search/multi?api_key=' + API_KEY + '&query=',
	movie: BASE_URL + 'movie/',
	upcoming:BASE_URL + 'movie/upcoming?api_key=' + API_KEY + '&page=',
	authentication : BASE_URL+ 'authentication/guest_session/new?api_key='+ API_KEY,
	movie_base:BASE_URL+ 'movie/',
	api: '?api_key=' + API_KEY
}