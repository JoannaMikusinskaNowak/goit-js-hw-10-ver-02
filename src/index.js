import { fetchBreeds, fetchCatByBreed } from './cat-api';

const breedSelect = document.querySelector('.breed-select');
const catInfoDiv = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');

function displayError(message) {
  error.textContent = message;
  error.style.display = 'flex';
}

function hideError() {
  error.style.display = 'none';
}

function createParagraph(text) {
  const p = document.createElement('p');
  p.textContent = text;
  return p;
}

function displayCatInfo(cat) {
  const catImage = document.createElement('img');
  catImage.src = cat[0].url;

  const breedName = document.createElement('p');
  breedName.textContent = cat[0].breeds[0].name;

  const description = document.createElement('p');
  description.textContent = cat[0].breeds[0].description;

  const temperament = document.createElement('p');
  temperament.textContent = cat[0].breeds[0].temperament;

  catInfoDiv.innerHTML = '';
  catInfoDiv.appendChild(catImage);
  catInfoDiv.appendChild(breedName);
  catInfoDiv.appendChild(description);
  catInfoDiv.appendChild(temperament);
}

function handleBreedSelect(event) {
  const breedId = event.target.value;

  hideError();
  catInfoDiv.innerHTML = '';
  loader.style.display = 'flex';

  fetchCatByBreed(breedId)
    .then(cat => {
      displayCatInfo(cat);
      loader.style.display = 'none';
    })
    .catch(error => {
      displayError(error.message);
      loader.style.display = 'none';
    });
}

function initApp() {
  hideError();
  loader.style.display = 'flex';

  fetchBreeds()
    .then(breeds => {
      breeds.forEach(breed => {
        const option = document.createElement('option');
        option.value = breed.id;
        option.textContent = breed.name;
        breedSelect.appendChild(option);
      });

      breedSelect.addEventListener('change', handleBreedSelect);
      loader.style.display = 'none';
    })
    .catch(error => {
      displayError(error.message);
      loader.style.display = 'none';
    });
}

initApp();
