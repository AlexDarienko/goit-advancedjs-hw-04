import { fetchImages } from './js/pixabay-api';
import { updateGallery, clearGallery } from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import './css/styles.css';


const searchForm = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
const loader = document.querySelector('.loader');

let query = '';
let page = 1;
const perPage = 15;
let totalHits = 0;

loadMoreBtn.style.display = 'none';
loader.style.display = 'none';

searchForm.addEventListener('submit', async event => {
  event.preventDefault();

  query = event.target.elements.searchQuery.value.trim();

  if (!query) {
    iziToast.error({ message: 'Please enter a search query.' });
    return;
  }

  clearGallery(gallery);
  page = 1;
  loadMoreBtn.style.display = 'none';

  loader.style.display = 'block';

  try {
    const { images, totalHits: newTotalHits } = await fetchImages(query, page, perPage);
    totalHits = newTotalHits;

    if (images.length === 0) {
      iziToast.warning({ message: 'No images found. Try another search.' });
      return;
    }

    updateGallery(gallery, images);
    loadMoreBtn.style.display = page * perPage < totalHits ? 'block' : 'none';
  } catch (error) {
    iziToast.error({ message: 'Something went wrong. Please try again.' });
  } finally {
    loader.style.display = 'none';
  }
});


loadMoreBtn.addEventListener('click', async () => {
  page += 1;
  loadMoreBtn.style.display = 'none';
  loader.style.display = 'block';

  try {
    const { images } = await fetchImages(query, page, perPage);

    if (images.length > 0) {
      updateGallery(gallery, images);

      const cardHeight = document.querySelector('.gallery-item').getBoundingClientRect().height;
      window.scrollBy({ top: cardHeight * 2, behavior: 'smooth' });
    }

    if (page * perPage >= totalHits) {
      loadMoreBtn.style.display = 'none';
      iziToast.info({ message: "We're sorry, but you've reached the end of search results." });
    } else {
      loadMoreBtn.style.display = 'block';
    }
  } catch (error) {
    iziToast.error({ message: 'Something went wrong. Please try again.' });
  } finally {
    loader.style.display = 'none';
  }
});
