import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { getPhotos } from './api/api';
import { makeMarkup } from './markup/markup';

const formEl = document.querySelector('.search-form');
const inputEl = document.querySelector('input');
const galleryEl = document.querySelector('.gallery');
export const btnLeadMoreEl = document.querySelector('.load-more');

let currentPage = 1;
let lastPage = 0;

formEl.addEventListener('submit', onSubmit);

async function onSubmit(event) {

  event.preventDefault();
  let inputValue = encodeURIComponent(inputEl.value);
  if(inputValue.trim() !== '') {
    
    const arrayPhotos = await getPhotos(inputValue, currentPage);
    galleryEl.innerHTML = makeMarkup(arrayPhotos);
    lastPage = Math.ceil(arrayPhotos.data.totalHits / 40);
    
    if (arrayPhotos.data.totalHits === 0) {
      btnLeadMoreEl.classList.add('hidden');
      Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
    } else {
      Notiflix.Notify.success(`Hooray! We found ${arrayPhotos.data.totalHits} images.`);
    }

    currentPage = 1;
    if (currentPage === lastPage || lastPage === 0) {
      btnLeadMoreEl.classList.add('hidden');
    } else {
      btnLeadMoreEl.classList.remove('hidden');
    }
  }
  
  new SimpleLightbox('.gallery a', {
    captionDelay: 250,
  });
  const { height: cardHeight } = document
  .querySelector(".gallery")
  .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 0.3,
    behavior: "smooth",
  });
}

btnLeadMoreEl.addEventListener('click', loadMore);

async function loadMore () {

  let inputValue = encodeURIComponent(inputEl.value);
  const morePhotos = await getPhotos(inputValue, currentPage+1);
  currentPage = morePhotos.config.params.page;

  galleryEl.innerHTML = galleryEl.innerHTML + makeMarkup(morePhotos);

  new SimpleLightbox('.gallery a', {
    captionDelay: 250,
  });

  const { height: cardHeight } = document
  .querySelector(".gallery")
  .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: "smooth",
  });

  if (currentPage === lastPage) {
    Notiflix.Notify.info("We're sorry, but you've reached the end of search results.", {
      width: '500px', 
      svgSize: '120px',
      position: 'right-bottom', 
    });
    btnLeadMoreEl.classList.add('hidden');
    
    return;
  };
}
