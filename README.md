# Pokédex Web Application

A simple, interactive Pokédex built with vanilla JavaScript that fetches real Pokémon data from the PokéAPI. This project demonstrates API integration, array higher-order functions, and responsive UI design.

## 📋 Project Overview

This web application allows users to:
- Browse the first 151 Pokémon 
- View detailed information about each Pokémon
- Search and filter Pokémon by name or number
- Sort results by name or number
- Mark favorites that persist in browser storage
- Toggle between light and dark themes

## 🎯 Features Implemented

### Core Features (Milestone 3)
✅ **Search** - Search Pokémon by name or number
✅ **Filtering** - Filter by favorites only
✅ **Sorting** - Sort alphabetically (A-Z) or by Pokédex number
✅ **Button Interactions** - Favorite toggle with heart icon
✅ **Dark Mode** - Toggle between light and dark themes with persistence

### Bonus Features
✅ **Debouncing** - Search input debounced (300ms) to optimize performance
✅ **Loading Indicators** - Spinner shown while fetching data
✅ **Local Storage** - Favorites and theme preference persist across sessions
✅ **Responsive Design** - Works on mobile, tablet, and desktop

## 🛠️ Technologies Used

- **HTML5** - Semantic structure
- **CSS3** - Styling with CSS variables, flexbox, grid, and responsive design
- **JavaScript (ES6+)** - Vanilla JS with modern syntax
- **PokéAPI** - RESTful Pokémon data source (https://pokeapi.co)

## 📦 Project Structure

```
assets/
├── back-to-home.svg
├── chevron_left.svg
├── chevron_right.svg
├── cross.svg
├── height.svg
├── pokeball.svg
├── pokedex.svg
├── search.svg
├── sorting.svg
└── weight.svg

css/
└── style.css

html/
├── detail.html
└── index.html

js/
├── pokemon-detail.js
├── pokemon.js
└── search.js

LICENSE
README.md

```

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection (to fetch Pokémon data from PokéAPI)

### Installation & Running

1. **Clone or download** this repository to your local machine

2. **Open** `index.html` in your web browser:
   ```bash
   # On macOS
   open index.html

   # On Windows
   start index.html

   # Or simply double-click the file
   ```

3. **That's it!** The app will load and automatically fetch the first 151 Pokémon.

### No Build Step Required
This project uses vanilla JavaScript and CSS - no installation, compilation, or build tools needed. Just open the HTML file in a browser.

## 🎮 How to Use

### Main Page (index.html)
1. **Search** - Type in the search box to filter Pokémon
   - Select "Number" to search by ID (e.g., "25" finds Pikachu)
   - Select "Name" to search by name (e.g., "pikachu")
2. **Sort** - Click the sort icon (☰) and choose Number or Name
3. **Favorites** - Click the heart icon on any Pokémon card to mark/unmark as favorite
4. **View Favorites Only** - Click the "Favorites" button to show only saved Pokémon
5. **Dark Mode** - Click the "Dark" button to toggle theme
6. **View Details** - Click anywhere on a Pokémon card to see detailed stats

### Detail Page (detail.html)
1. **Navigate** - Use left/right arrows to browse between Pokémon
2. **Back** - Click "← Back" to return to the main list
3. **View Stats** - See base stats with progress bars, types, abilities, weight, height
4. **Theme Color** - The page theme changes based on the Pokémon's primary type

## 💻 Code Highlights

### Array Higher-Order Functions Used

**pokemon.js:**
```javascript
// Filtering (search)
all.filter(pokemon => {
  const id = getid(pokemon.url);
  return mode === 'number' ? id.startsWith(term) : pokemon.name.startsWith(term);
});

// Sorting
[...list].sort((a, b) => {
  if (mode === 'name') return a.name.localeCompare(b.name);
  return parseInt(getid(a.url)) - parseInt(getid(b.url));
});

// Rendering
list.forEach(pokemon => {
  // create card element
});

// Favorites filtering
favs.filter(f => f !== id);  // Remove
favs.push(id);               // Add
```

**pokemon-detail.js:**
```javascript
// Map to generate type badges
p.types.map(t => `<span class="type-badge">${t.type.name}</span>`).join('');

// Map to generate stats
p.stats.map(s => `
  <div class="stat-row">
    <div class="stat-name">${statsMap[s.stat.name]}</div>
    <div class="stat-value">${s.base_stat}</div>
    <div class="stat-bar"><div class="stat-fill" style="width:${s.base_stat}%"></div></div>
  </div>
`).join('');
```

## 🎨 Design Decisions

### Color Scheme
- **Primary Red:** `#dc0a2d` (bold, energetic, matches Pokémon branding)
- **Dark Mode:** High-contrast dark theme for comfortable viewing
- **Type Colors:** Each Pokémon type has its official color applied dynamically

### Responsive Breakpoints
- **Desktop:** Full grid layout (auto-fill, minmax 160px)
- **Tablet (768px):** Adjusted grid, smaller images
- **Mobile (480px):** 2-column grid, simplified UI

### Performance Optimizations
- Debounced search (300ms delay) prevents excessive filtering
- Lazy loading images (`loading="lazy"`)
- Minimal DOM manipulation with efficient rendering
- No external dependencies (zero bloat)

## 🐛 Known Limitations

- Only displays first 151 Pokémon (Generation 1) - can be expanded by changing `MAX` constant
- Pokémon images load from external GitHub CDN (requires internet)
- Search only matches from the beginning of names/numbers (no substring search)
- No pagination - all 151 Pokémon load at once (acceptable for this dataset size)

## 🔧 Customization

### Change number of Pokémon
In `pokemon.js`, line 7:
```javascript
const MAX = 151; // Change this to load more Pokémon
```

### Adjust debounce delay
In `pokemon.js`, line 219:
```javascript
window.timer = setTimeout(doSearch, 300); // Change 300 to desired ms
```

### Modify color scheme
In `style.css`, lines 9-17:
```css
:root {
  --red: #dc0a2d;        /* Primary color */
  --red-dark: #b00021;   /* Darker shade for gradients */
  /* ... */
}
```

## 📚 Learning Outcomes

This project demonstrates understanding of:
- REST API integration with `fetch()`
- Array higher-order functions: `.filter()`, `.sort()`, `.forEach()`, `.map()`, `.includes()`
- DOM manipulation and event handling
- CSS Grid and Flexbox layouts
- CSS custom properties (variables)
- Responsive design with media queries
- LocalStorage for data persistence
- Async/await and Promise handling
- Modern ES6+ JavaScript features

## 🙏 Credits

- **PokéAPI** - Pokémon data (https://pokeapi.co)
- **Pokémon** - © Nintendo/Creatures Inc./GAME FREAK inc.


