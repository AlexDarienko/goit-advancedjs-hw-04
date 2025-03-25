import axios from "axios";

const API_KEY = "49359738-1a7aad8ecd2da3da8f5235c9c";
const BASE_URL = "https://pixabay.com/api/";

export default class PixabayAPI {
  constructor() {
    this.query = '';
    this.page = 1;
    this.perPage = 15;
    this.totalHits = 0;
  }

  async fetchImages() {
    try {
      const response = await axios.get(BASE_URL, {
        params: {
          key: API_KEY,
          q: this.query,
          image_type: 'photo',
          orientation: 'horizontal',
          safesearch: true,
          per_page: this.perPage,
          page: this.page,
        },
      });

      this.totalHits = response.data.totalHits;
      return response.data.hits;
    } catch (error) {
      console.error('Помилка отримання даних:', error);
      return [];
    }
  }

  resetPage() {
    this.page = 1;
  }

  nextPage() {
    this.page += 1;
  }

  hasMorePages() {
    return this.page * this.perPage < this.totalHits;
  }
}