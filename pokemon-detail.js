const MAX = 151;
let curId = null;

const colors = {
  normal: '#A8A878', fire: '#F08030', water: '#6890F0', electric: '#F8D030',
  grass: '#78C850', ice: '#98D8D8', fighting: '#C03028', poison: '#A040A0',
  ground: '#E0C068', flying: '#A890F0', psychic: '#F85888', bug: '#A8B820',
  rock: '#B8A038', ghost: '#705898', dragon: '#7038F8', dark: '#705848',
  steel: '#B8B8D0', fairy: '#EE99AC'
};

const statsMap = {
  hp: 'Hit Points', attack: 'Attack', defense: 'Defense',
  'special-attack': 'Special Attack', 'special-defense': 'Special Defense', speed: 'Speed'
};

document.addEventListener('DOMContentLoaded', () => {
  const id = parseInt(new URLSearchParams(window.location.search).get('id'));
  if (!id || id < 1 || id > MAX) {
    window.location.href = 'index.html';
    return;
  }
  curId = id;
  load(id);
});

async function load(id) {
  curId = id; // Set current ID before fetching

  try {
    const [p, spec] = await Promise.all([
      fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then(r => r.json()),
      fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`).then(r => r.json())
    ]);

    // Double-check we're still on this Pokemon
    if (curId !== id) return;

    show(p);
    document.querySelector('.pokemon-description').textContent =
      spec.flavor_text_entries.find(e => e.language.name === 'en')?.flavor_text.replace(/\f/g, ' ') || '';

    setupNav(id);
  } catch (e) {
    console.error(e);
  }
}

function show(p) {
  document.title = `${p.name} | Pokedex`;
  document.querySelector('#pokemon-name').textContent = p.name.charAt(0).toUpperCase() + p.name.slice(1);
  document.querySelector('#pokemon-id').textContent = `#${String(p.id).padStart(3, '0')}`;
  document.querySelector('#pokemon-img').src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${p.id}.svg`;

  // Types
  document.getElementById('pokemon-types').innerHTML = p.types
    .map(t => `<span class="type-badge">${t.type.name}</span>`)
    .join('');

  // Info
  document.querySelector('#pokemon-weight').textContent = `${(p.weight/10).toFixed(1)} kg`;
  document.querySelector('#pokemon-height').textContent = `${(p.height/10).toFixed(1)} m`;

  // Abilities
  document.getElementById('pokemon-abilities').innerHTML = p.abilities
    .map(a => `<span class="ability">${a.ability.name}</span>`)
    .join('');

  // Stats
  document.getElementById('stats-list').innerHTML = p.stats
    .map(s => `
      <div class="stat-row">
        <div class="stat-name">${statsMap[s.stat.name]||s.stat.name.toUpperCase()}</div>
        <div class="stat-value">${String(s.base_stat).padStart(3,'0')}</div>
        <div class="stat-bar"><div class="stat-fill" style="width:${s.base_stat}%"></div></div>
      </div>
    `).join('');

  // Theme color
  const color = colors[p.types[0].type.name] || '#666';
  document.querySelector('.detail-content').style.backgroundColor = color;
  document.querySelectorAll('.type-badge').forEach(el => el.style.backgroundColor = color);
}

function setupNav(id) {
  const prev = document.getElementById('prev-btn');
  const next = document.getElementById('next-btn');
  const back = document.getElementById('back-btn');

  // Back button
  back.onclick = () => window.location.href = 'index.html';

  // Disable arrows at boundaries
  prev.disabled = id === 1;
  next.disabled = id === 151;

  // Arrow navigation - update curId before loading
  prev.onclick = () => {
    if (id > 1) {
      curId = id - 1;
      load(curId);
    }
  };

  next.onclick = () => {
    if (id < 151) {
      curId = id + 1;
      load(curId);
    }
  };
}
