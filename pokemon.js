const input = document.getElementById('search-input');
const clear = document.getElementById('search-clear');
const sortBtn = document.getElementById('sort-btn');
const sortOptions = document.querySelector('.sort-options');

// Clear button
input.addEventListener('input', () => {
  clear.classList.toggle('hidden', !input.value);
});

clear.addEventListener('click', () => {
  input.value = '';
  clear.classList.add('hidden');
  input.focus();
});

// Sort dropdown
sortBtn.addEventListener('click', e => {
  e.stopPropagation();
  sortOptions.classList.toggle('hidden');
});

document.addEventListener('click', () => {
  sortOptions.classList.add('hidden');
});
