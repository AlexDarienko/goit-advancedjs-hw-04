
import PixabayAPI from './js/pixabay-api';
import { updateGallery, clearGallery } from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import "./css/styles.css";

const searchForm = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

const pixabay = new PixabayAPI();

searchForm.addEventListener('submit', async event => {
  event.preventDefault();
  pixabay.query = event.target.elements.searchQuery.value.trim();

  if (!pixabay.query) {
    iziToast.error({ message: 'Please enter a search query.' });
    return;
  }

  pixabay.resetPage();
  clearGallery(gallery);
  loadMoreBtn.style.display = 'none';

  const images = await pixabay.fetchImages();

  if (images.length === 0) {
    iziToast.warning({ message: 'No images found. Try another search.' });
    return;
  }

  updateGallery(gallery, images);
  loadMoreBtn.style.display = pixabay.hasMorePages() ? 'block' : 'none';
});

loadMoreBtn.addEventListener('click', async () => {
  pixabay.nextPage();
  const images = await pixabay.fetchImages();

  if (images.length > 0) {
    updateGallery(gallery, images);
    window.scrollBy({ top: document.querySelector('.gallery-item').getBoundingClientRect().height * 2, behavior: 'smooth' });
  }

  if (!pixabay.hasMorePages()) {
    loadMoreBtn.style.display = 'none';
    iziToast.info({ message: "We're sorry, but you've reached the end of search results." });
  }
});
