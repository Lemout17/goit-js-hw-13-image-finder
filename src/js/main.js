import imageTmpl from '../templates/card-tmpl.hbs';
import ApiService from './fetch';
import errorRequest from './pnotify';
const basicLightbox = require('basiclightbox');
import 'basiclightbox/dist/basicLightbox.min.css';

const refs = {
  container: document.querySelector('.gallery'),
  form: document.querySelector('.search-form'),
  loadMoreBtn: document.querySelector('[data-action="load-more"]'),
};
const apiService = new ApiService();

refs.form.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);
refs.loadMoreBtn.classList.add('is-hidden');

function onSearch(e) {
  e.preventDefault();

  apiService.query = e.currentTarget.elements.query.value;
  apiService.resetPage();

  if (e.currentTarget.elements.query.value === '') {
    errorRequest();
    return;
  }

  apiService.getFetch().then(hits => {
    clearImagesContainer();
    appendImagesMarkup(hits);
    refs.loadMoreBtn.classList.remove('is-hidden');
  });
}

function onLoadMore() {
  apiService.getFetch().then(appendImagesMarkup);
}

function appendImagesMarkup(hits) {
  refs.container.insertAdjacentHTML('beforeend', imageTmpl(hits));
}

function clearImagesContainer() {
  refs.container.innerHTML = '';
}

refs.container.addEventListener('click', e => {
  e.preventDefault();
  if (e.target.nodeName !== 'IMG') {
    return;
  }
  basicLightbox
    .create(`<img class="lightbox__image" src='${e.target.dataset.source}'>`)
    .show();
});
