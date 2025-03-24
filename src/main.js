import { fetchImages } from './js/pixabay-api';
import { createMarkup, updateGallery } from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const searchForm = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

let query = '';
let page = 1;
let totalHits = 0;

searchForm.addEventListener('submit', async event => {
  event.preventDefault();
  query = event.currentTarget.searchQuery.value.trim();

  if (!query) {
    iziToast.warning({ message: 'Please enter a search query' });
    return;
  }

  page = 1;
  gallery.innerHTML = '';
  loadMoreBtn.style.display = 'none';

  try {
    const data = await fetchImages(query, page);
    totalHits = data.totalHits;

    if (data.hits.length === 0) {
      iziToast.info({ message: 'No images found' });
      return;
    }

    updateGallery(createMarkup(data.hits));
    loadMoreBtn.style.display = 'block';
  } catch (error) {
    iziToast.error({ message: 'Error fetching images' });
  }
});

loadMoreBtn.addEventListener('click', async () => {
  page += 1;

  try {
    const data = await fetchImages(query, page);

    updateGallery(createMarkup(data.hits));

    const { height: cardHeight } = document.querySelector('.gallery .photo-card').getBoundingClientRect();
    window.scrollBy({ top: cardHeight * 2, behavior: 'smooth' });

    if (page * 15 >= totalHits) {
      loadMoreBtn.style.display = 'none';
      iziToast.info({ message: "We're sorry, but you've reached the end of search results." });
    }
  } catch (error) {
    iziToast.error({ message: 'Error fetching images' });
  }
});