import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { getImagesByQuery } from './js/pixabay-api';
import {
  clearGallery,
  createGallery,
  hideLoadMoreButton,
  hideLoader,
  showLoadMoreButton,
  showLoader,
} from './js/render-functions';

const form = document.querySelector('.form');
const searchInput = form.elements['search-text'];
const loadMoreButton = document.querySelector('.load-more-btn');

let currentQuery = '';
let currentPage = 1;
let loadedImages = 0;
let totalHits = 0;

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const query = searchInput.value.trim();

  if (!query) {
    clearGallery();
    hideLoadMoreButton();
    iziToast.warning({
      message: 'Please enter a search query.',
      position: 'topRight',
    });
    return;
  }

  currentQuery = query;
  currentPage = 1;
  loadedImages = 0;
  totalHits = 0;

  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const { hits, totalHits: total } = await getImagesByQuery(currentQuery, currentPage);

    if (hits.length === 0) {
      iziToast.error({
        message: 'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      return;
    }

    totalHits = total;
    loadedImages = hits.length;
    createGallery(hits);
    updateLoadMoreButton();
  } catch {
    iziToast.error({
      message: 'Something went wrong. Please try again later.',
      position: 'topRight',
    });
  } finally {
    hideLoader();
    form.reset();
  }
});

loadMoreButton.addEventListener('click', async () => {
  const nextPage = currentPage + 1;

  hideLoadMoreButton();
  showLoader();

  try {
    const { hits } = await getImagesByQuery(currentQuery, nextPage);

    currentPage = nextPage;
    createGallery(hits);
    loadedImages += hits.length;
    scrollByGalleryCardHeight();
    updateLoadMoreButton();
  } catch {
    iziToast.error({
      message: 'Something went wrong. Please try again later.',
      position: 'topRight',
    });
    showLoadMoreButton();
  } finally {
    hideLoader();
  }
});

function updateLoadMoreButton() {
  if (loadedImages >= totalHits) {
    hideLoadMoreButton();
    iziToast.info({
      message: "We're sorry, but you've reached the end of search results.",
      position: 'topRight',
    });
    return;
  }

  showLoadMoreButton();
}

function scrollByGalleryCardHeight() {
  const galleryItem = document.querySelector('.gallery-item');

  if (!galleryItem) {
    return;
  }

  const { height } = galleryItem.getBoundingClientRect();

  window.scrollBy({
    top: height * 2,
    behavior: 'smooth',
  });
}
