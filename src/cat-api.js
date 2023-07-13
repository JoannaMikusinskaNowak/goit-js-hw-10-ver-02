import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_IHD66X8MZ8GnV9Oe7QGFTgC9GIxtngxh4krhgzxLUF0mhXzIesUW6DMtMU0yp7lc';

export function fetchBreeds() {
  return axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(response => {
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error('Błąd podczas pobierania ras kotów.');
      }
    })
    .catch(error => {
      throw new Error('Błąd podczas pobierania ras kotów: ' + error.message);
    });
}

export function fetchCatByBreed(breedId) {
  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(response => {
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error('Błąd podczas pobierania informacji o kocie.');
      }
    })
    .catch(error => {
      throw new Error(
        'Błąd podczas pobierania informacji o kocie: ' + error.message
      );
    });
}
