const input = document.getElementById('search-input');
const clear = document.getElementById('search-clear');
const sortBtn = document.getElementById('sort-btn');
const sortOptions = document.querySelector('.sort-options');

input.addEventListener('input', function () {
  clear.classList.toggle('hidden', !input.value);
});

clear.addEventListener('click', function () {
  input.value = '';
  clear.classList.add('hidden');
  input.dispatchEvent(new Event('keyup'));
});

sortBtn.addEventListener('click', function (e) {
  e.stopPropagation();
  sortOptions.classList.toggle('hidden');
});

document.addEventListener('click', function () {
  sortOptions.classList.add('hidden');
});
