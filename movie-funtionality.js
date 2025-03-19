const APILINK = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=7554051583eab6298a2fb63d94305b42&page=1';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCHAPI = 'https://api.themoviedb.org/3/search/movie?api_key=7554051583eab6298a2fb63d94305b42&query=';

const searchInput = document.querySelector('.js-search-input');

let movieCards = []; 
function returnMovies(url) {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log(data.results);
      movieCards = data.results.map(movie => ({
        image: movie.poster_path ? `${IMG_PATH}${movie.poster_path}` : 'image/default.jpg',
        title: movie.title
      }));

      showMovies(); 
    })
    .catch(error => console.error(error));
}


function showMovies() {
  let html = '';

  movieCards.forEach(movieCard => {
    html += `
      <div class="movie-details">
        <div class="thumbnails">
          <img src="${movieCard.image}" class="movies-thumb">
          <p class="movie-title">${movieCard.title}</p>
        </div>
      </div>
      
      
    `;
  });

  document.querySelector('.js-movie-card').innerHTML = html;
}


returnMovies(APILINK);

searchInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    const searchTerm = searchInput.value.trim();
    if (searchTerm) {
      returnMovies(SEARCHAPI + searchTerm);
      
    }
    searchInput.value = '';
  }
});
