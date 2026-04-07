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

const isDark = localStorage.getItem('dark') === 'true';
document.body.classList.toggle('dark-mode', isDark);
darkBtn.textContent = isDark ? '☀ Light' : '☾ Dark';

darkBtn.onclick = function () {
  const nowDark = document.body.classList.toggle('dark-mode');
  localStorage.setItem('dark', nowDark);
  darkBtn.textContent = nowDark ? '☀ Light' : '☾ Dark';
};

loading.classList.remove('hidden');

fetch('https://pokeapi.co/api/v2/pokemon?limit=' + MAX)
  .then(function (r) {
    return r.json();
  })
  .then(function (d) {
    all = d.results;
    draw(all);
    loading.classList.add('hidden');
  })
  .catch(function () {
    notFound.textContent = 'Failed to load. Check connection.';
    notFound.classList.remove('hidden');
    loading.classList.add('hidden');
  });

const getid = function (u) {
  return u.split('/').filter(Boolean).pop();
};

function draw(list) {
  grid.innerHTML = '';

  if (!list.length) {
    notFound.classList.remove('hidden');
    return;
  }

  notFound.classList.add('hidden');

  list.forEach(function (p) {
    const id = getid(p.url);

    const card = document.createElement('div');
    card.className = 'pokemon-card';

    card.innerHTML =
      '<div class="pokemon-number">' +
        '<span>#' + id + '</span>' +
        '<button class="fav-btn ' + (favs.includes(id) ? 'active' : '') + '" data-id="' + id + '">♥</button>' +
      '</div>' +
      '<div class="pokemon-img">' +
        '<img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/' + id + '.svg" alt="' + p.name + '">' +
      '</div>' +
      '<div class="pokemon-name">' + p.name + '</div>';

    card.onclick = function (e) {
      if (e.target.classList.contains('fav-btn')) return;
      window.location.href = './detail.html?id=' + id;
    };

    card.querySelector('.fav-btn').onclick = function (e) {
      e.stopPropagation();
      toggleFav(id, e.target);
    };

    grid.appendChild(card);
  });
}

let timer;

search.onkeyup = function () {
  clearTimeout(timer);
  timer = setTimeout(doSearch, 300);
};

function doSearch() {
  const term = search.value.toLowerCase().trim();
  const mode = document.querySelector('input[name="sort"]:checked').value;

  let filtered = all.filter(function (p) {
    const id = getid(p.url);

    if (mode === 'number') {
      return id.startsWith(term);
    } else {
      return p.name.startsWith(term);
    }
  });

  if (onlyFavs) {
    filtered = filtered.filter(function (p) {
      return favs.includes(getid(p.url));
    });
  }

  filtered.sort(function (a, b) {
    if (mode === 'name') {
      return a.name.localeCompare(b.name);
    } else {
      return parseInt(getid(a.url)) - parseInt(getid(b.url));
    }
  });

  draw(filtered);
}

document.querySelectorAll('input[name="sort"]').forEach(function (r) {
  r.onchange = doSearch;
});

favBtn.onclick = function () {
  onlyFavs = !onlyFavs;
  favBtn.classList.toggle('active', onlyFavs);

  if (onlyFavs) {
    favBtn.textContent = '♥ All';
  } else {
    favBtn.textContent = '♥ Favorites';
  }

  doSearch();
};

clear.onclick = function () {
  search.value = '';
  clear.classList.add('hidden');
  doSearch();
};

function toggleFav(id, btn) {
  if (favs.includes(id)) {
    favs = favs.filter(function (f) {
      return f !== id;
    });
    btn.classList.remove('active');
  } else {
    favs.push(id);
    btn.classList.add('active');
  }

  localStorage.setItem('favs', JSON.stringify(favs));

  if (onlyFavs) {
    doSearch();
  }
}

search.oninput = function () {
  clear.classList.toggle('hidden', !search.value);
};

sortBtn.onclick = function (e) {
  e.stopPropagation();
  sortOpts.classList.toggle('hidden');
};

document.onclick = function () {
  sortOpts.classList.add('hidden');
};
