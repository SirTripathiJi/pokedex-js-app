const MAX = 151;
let all = [];
let favs = JSON.parse(localStorage.getItem('favs')) || [];
let onlyFavs = false;

const grid = document.getElementById('pokemon-grid');
const search = document.getElementById('search-input');
const clear = document.getElementById('search-clear');
const sortBtn = document.getElementById('sort-btn');
const sortOpts = document.querySelector('.sort-options');
const darkBtn = document.getElementById('dark-mode');
const favBtn = document.getElementById('favorites');
const loading = document.getElementById('loading');
const notFound = document.getElementById('not-found');

// Dark mode on load
document.body.classList.toggle('dark-mode', localStorage.getItem('dark') === 'true');
darkBtn.textContent = localStorage.getItem('dark') === 'true' ? '☀ Light' : '☾ Dark';

darkBtn.onclick = () => {
  const dark = !document.body.classList.toggle('dark-mode');
  localStorage.setItem('dark', dark);
  darkBtn.textContent = dark ? '☀ Light' : '☾ Dark';
};

// Load data
loading.classList.remove('hidden');
fetch(`https://pokeapi.co/api/v2/pokemon?limit=${MAX}`)
  .then(r => r.json())
  .then(d => {
    all = d.results;
    draw(all);
    loading.classList.add('hidden');
  })
  .catch(() => {
    notFound.textContent = 'Failed to load. Check connection.';
    notFound.classList.remove('hidden');
    loading.classList.add('hidden');
  });

const getid = u => u.split('/').filter(Boolean).pop();

function draw(list) {
  grid.innerHTML = '';
  if (!list.length) {
    notFound.classList.remove('hidden');
    return;
  }
  notFound.classList.add('hidden');

  list.forEach(p => {
    const id = getid(p.url);
    const card = document.createElement('div');
    card.className = 'pokemon-card';
    card.innerHTML = `
      <div class="pokemon-number">
        <span>#${id}</span>
        <button class="fav-btn ${favs.includes(id) ? 'active' : ''}" data-id="${id}">♥</button>
      </div>
      <div class="pokemon-img">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg" alt="${p.name}">
      </div>
      <div class="pokemon-name">${p.name}</div>
    `;
    card.onclick = e => {
      if (e.target.classList.contains('fav-btn')) return;
      window.location.href = `detail.html?id=${id}`;
    };
    card.querySelector('.fav-btn').onclick = e => {
      e.stopPropagation();
      toggleFav(id, e.target);
    };
    grid.appendChild(card);
  });
}

// Search with debounce
let timer;
search.onkeyup = () => {
  clearTimeout(timer);
  timer = setTimeout(doSearch, 300);
};

function doSearch() {
  const term = search.value.toLowerCase().trim();
  const mode = document.querySelector('input[name="sort"]:checked').value;

  let filtered = all.filter(p => {
    const id = getid(p.url);
    return mode === 'number' ? id.startsWith(term) : p.name.startsWith(term);
  });

  if (onlyFavs) {
    filtered = filtered.filter(p => favs.includes(getid(p.url)));
  }

  draw(filtered.sort((a, b) => {
    const mode = document.querySelector('input[name="sort"]:checked').value;
    if (mode === 'name') return a.name.localeCompare(b.name);
    return parseInt(getid(a.url)) - parseInt(getid(b.url));
  }));
}

// Radio buttons
document.querySelectorAll('input[name="sort"]').forEach(r => {
  r.onchange = doSearch;
});

// Favorites filter
favBtn.onclick = () => {
  onlyFavs = !onlyFavs;
  favBtn.classList.toggle('active', onlyFavs);
  favBtn.textContent = onlyFavs ? '♥ All' : '♥ Favorites';
  doSearch();
};

// Clear search
clear.onclick = () => {
  search.value = '';
  clear.classList.add('hidden');
  doSearch();
};

// Toggle favorite
function toggleFav(id, btn) {
  if (favs.includes(id)) {
    favs = favs.filter(f => f !== id);
    btn.classList.remove('active');
  } else {
    favs.push(id);
    btn.classList.add('active');
  }
  localStorage.setItem('favs', JSON.stringify(favs));
  if (onlyFavs) doSearch();
}

// Show/hide clear button
search.oninput = () => {
  clear.classList.toggle('hidden', !search.value);
};

// Sort dropdown
sortBtn.onclick = e => {
  e.stopPropagation();
  sortOpts.classList.toggle('hidden');
};

document.onclick = () => sortOpts.classList.add('hidden');
