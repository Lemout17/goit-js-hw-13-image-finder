const BASE_URL = 'https://pixabay.com/api';
const KEY = '21359619-d33abf781fc12db63121b07d3';

function fetchCountry(searchQuery) {
    
    return fetch(`${BASE_URL}/?image_type=photo&orientation=horizontal&q=${searchQuery}&page=1&per_page=12&key=${KEY}`).then(response => {
      return response.json();
      
    })
    
}

export default { fetchCountry };