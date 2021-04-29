export default class ApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  getFetch() {
    const url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=21359619-d33abf781fc12db63121b07d3`;
    
    return fetch(url)
        .then(responce => responce.json())
      .then(({hits}) => {
        
        this.incrementPage();
        return hits;
        }).catch(error => console.log(error))

  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }


}