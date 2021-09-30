import imageTmpl from '../templates/card-tmpl.hbs';
import ApiService from './fetch';
import errorRequest from './pnotify';
const basicLightbox = require('basiclightbox');
import 'basiclightbox/dist/basicLightbox.min.css';

const refs = {
  container: document.querySelector('.gallery'),
  form: document.querySelector('.search-form'),
  loadMoreBtn: document.querySelector('[data-action="load-more"]'),
  upBtn: document.querySelector('[data-action="to-top"]'),
};
const apiService = new ApiService();

refs.loadMoreBtn.classList.add('is-hidden');
refs.upBtn.classList.add('is-hidden');

function onSearch(e) {
  e.preventDefault();

  console.log(e.currentTarget.elements.query.value);
  console.log(e.currentTarget.elements.query);
  apiService.query = e.currentTarget.elements.query.value;
  apiService.resetPage();

  if (e.currentTarget.elements.query.value === '') {
    errorRequest();
    return;
  }

  apiService.getFetch().then(hits => {
    refs.container.innerHTML = '';
    appendImagesMarkup(hits);
    refs.loadMoreBtn.classList.remove('is-hidden');
    refs.upBtn.classList.remove('is-hidden');
  });
}

function onLoadMore() {
  apiService
    .getFetch()
    .then(appendImagesMarkup)
    .then(() => {
      window.scrollTo({
        top: document.body.offsetHeight,
        behavior: 'smooth',
      });
    });
}

function appendImagesMarkup(hits) {
  refs.container.insertAdjacentHTML('beforeend', imageTmpl(hits));
}

function scrollUp() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}

refs.form.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);
refs.upBtn.addEventListener('click', scrollUp);
refs.container.addEventListener('click', e => {
  e.preventDefault();
  if (e.target.nodeName !== 'IMG') {
    return;
  }
  basicLightbox
    .create(`<img class="lightbox__image" src='${e.target.dataset.source}'>`)
    .show();
});
