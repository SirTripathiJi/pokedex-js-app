const MAX = 151;
let curId = null;

const colors = {
  normal: '#A8A878',
  fire: '#F08030',
  water: '#6890F0',
  electric: '#F8D030',
  grass: '#78C850',
  ice: '#98D8D8',
  fighting: '#C03028',
  poison: '#A040A0',
  ground: '#E0C068',
  flying: '#A890F0',
  psychic: '#F85888',
  bug: '#A8B820',
  rock: '#B8A038',
  ghost: '#705898',
  dragon: '#7038F8',
  dark: '#705848',
  steel: '#B8B8D0',
  fairy: '#EE99AC'
};

const statsMap = {
  hp: 'Hit Points',
  attack: 'Attack',
  defense: 'Defense',
  'special-attack': 'Special Attack',
  'special-defense': 'Special Defense',
  speed: 'Speed'
};

document.addEventListener('DOMContentLoaded', function () {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get('id'));

  if (!id || id < 1 || id > MAX) {
    window.location.href = 'index.html';
    return;
  }

  curId = id;
  load(id);
});

async function load(id) {
  curId = id;

  try {
    const res1 = await fetch('https://pokeapi.co/api/v2/pokemon/' + id);
    const p = await res1.json();

    const res2 = await fetch('https://pokeapi.co/api/v2/pokemon-species/' + id);
    const spec = await res2.json();

    if (curId !== id) return;

    show(p);

    const entry = spec.flavor_text_entries.find(function (e) {
      return e.language.name === 'en';
    });

    if (entry) {
      document.querySelector('.pokemon-description').textContent =
        entry.flavor_text.replace(/\f/g, ' ');
    } else {
      document.querySelector('.pokemon-description').textContent = '';
    }

    setupNav(id);

  } catch (e) {
    console.error(e);
  }
}

function show(p) {
  document.title = p.name + ' | Pokedex';

  const name = p.name.charAt(0).toUpperCase() + p.name.slice(1);
  document.querySelector('#pokemon-name').textContent = name;

  const idText = '#' + String(p.id).padStart(3, '0');
  document.querySelector('#pokemon-id').textContent = idText;

  const img =
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/' +
    p.id +
    '.svg';
  document.querySelector('#pokemon-img').src = img;

  const typesHTML = p.types.map(function (t) {
    return '<span class="type-badge">' + t.type.name + '</span>';
  }).join('');
  document.getElementById('pokemon-types').innerHTML = typesHTML;

  const weight = (p.weight / 10).toFixed(1) + ' kg';
  document.querySelector('#pokemon-weight').textContent = weight;

  const height = (p.height / 10).toFixed(1) + ' m';
  document.querySelector('#pokemon-height').textContent = height;

  const abilitiesHTML = p.abilities.map(function (a) {
    return '<span class="ability">' + a.ability.name + '</span>';
  }).join('');
  document.getElementById('pokemon-abilities').innerHTML = abilitiesHTML;

  const statsHTML = p.stats.map(function (s) {
    const name = statsMap[s.stat.name] || s.stat.name.toUpperCase();
    const value = String(s.base_stat).padStart(3, '0');

    return (
      '<div class="stat-row">' +
        '<div class="stat-name">' + name + '</div>' +
        '<div class="stat-value">' + value + '</div>' +
        '<div class="stat-bar">' +
          '<div class="stat-fill" style="width:' + s.base_stat + '%"></div>' +
        '</div>' +
      '</div>'
    );
  }).join('');

  document.getElementById('stats-list').innerHTML = statsHTML;

  const type = p.types[0].type.name;
  const color = colors[type] || '#666';

  document.querySelector('.detail-content').style.backgroundColor = color;

  const badges = document.querySelectorAll('.type-badge');
  badges.forEach(function (el) {
    el.style.backgroundColor = color;
  });
}

function setupNav(id) {
  const prev = document.getElementById('prev-btn');
  const next = document.getElementById('next-btn');
  const back = document.getElementById('back-btn');

  back.onclick = function () {
    window.location.href = 'index.html';
  };

  prev.disabled = id === 1;
  next.disabled = id === MAX;

  prev.onclick = function () {
    if (id > 1) {
      load(id - 1);
    }
  };

  next.onclick = function () {
    if (id < MAX) {
      load(id + 1);
    }
  };
}
