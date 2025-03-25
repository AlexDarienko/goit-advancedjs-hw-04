import axios from 'axios';

const API_KEY = '49359738-1a7aad8ecd2da3da8f5235c9c';
const BASE_URL = 'https://pixabay.com/api/';

/**
 * Функція для отримання зображень з Pixabay API
 * @param {string} query - Пошуковий запит
 * @param {number} page - Номер сторінки
 * @param {number} perPage - Кількість зображень на сторінці (за замовчуванням 15)
 * @returns {Promise<object>} - Об'єкт зображень та загальною кількістю результатів
 */
export async function fetchImages(query, page = 1, perPage = 15) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: perPage,
        page: page,
      },
    });

    return {
      images: response.data.hits,
      totalHits: response.data.totalHits,
    };
  } catch (error) {
    console.error('Помилка отримання даних:', error);
    return { images: [], totalHits: 0 };
  }
}
