# Pokédex Web Application

A simple, interactive Pokédex built with vanilla JavaScript that fetches real Pokémon data from the PokéAPI. This project demonstrates API integration, array higher-order functions, and responsive UI design.

## 📋 Project Overview

This web application allows users to:
- Browse the first 151 Pokémon (Generation 1)
- View detailed information about each Pokémon
- Search and filter Pokémon by name or number
- Sort results by name or number
- Mark favorites that persist in browser storage
- Toggle between light and dark themes

**Final Submission Deadline:** 10th April 2025

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
pokedex-tutorial-main/
├── index.html          # Main list page
├── detail.html         # Pokémon detail page
├── style.css           # All styling (responsive + dark mode)
├── pokemon.js          # Main list logic (fetch, display, search, sort, favorites)
├── pokemon-detail.js   # Detail page logic (stats, navigation, theme)
├── search.js           # Search UI interactions (clear button, dropdown)
├── assets/
│   ├── pokeball.svg
│   ├── search.svg
│   ├── cross.svg
│   ├── sorting.svg
│   ├── back-to-home.svg
│   ├── chevron_left.svg
│   ├── chevron_right.svg
│   └── pokedex.svg
└── README.md           # This file
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

## 📊 Milestone Completion

### ✅ Milestone 1: Project Setup (23rd March)
- Chosen project: Pokédex web application
- Selected API: PokéAPI (free, no authentication, extensive data)
- Repository created and initialized
- Initial README and project structure established

### ✅ Milestone 2: API Integration (1st April)
- Implemented `fetch()` to retrieve Pokémon data from PokéAPI
- Dynamically display 151 Pokémon with images, names, and numbers
- Loading spinner shown during API calls
- Error handling for network failures
- Fully responsive across devices (mobile, tablet, desktop)

### ✅ Milestone 3: Core Features (8th April)
- **Search:** Filter Pokémon by name or number (array `.filter()`)
- **Sorting:** Sort by name (alphabetical) or number (numerical) (array `.sort()`)
- **Favorites:** Add/remove favorite Pokémon with persistent storage
- **Dark Mode:** Toggle theme with localStorage persistence
- All HOFs implemented - NO `for` or `while` loops used

### ✅ Milestone 4: Documentation & Deployment (10th April)
- Comprehensive README with setup, usage, and code explanations
- Code refactored for clarity and maintainability
- Clean, commented, beginner-friendly code structure
- Ready for deployment

## 🌐 Deployment

### Option 1: GitHub Pages (Recommended - Free)
1. Push this repository to GitHub
2. Go to repository Settings → Pages
3. Select "main" branch as source
4. Your app will be live at: `https://yourusername.github.io/pokedex-tutorial-main/`

### Option 2: Netlify (Free)
1. Drag and drop the project folder to [Netlify Drop](https://app.netlify.com/drop)
2. Instant deployment with custom URL

### Option 3: Vercel (Free)
```bash
npm i -g vercel
vercel --prod
```

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

## 📝 Best Practices Followed

✅ **Clean Code** - Consistent formatting, meaningful variable names
✅ **DRY Principle** - Reusable functions (`getid`, `render`)
✅ **Separation of Concerns** - API logic, UI rendering, event handling in separate files
✅ **Error Handling** - Try-catch for API calls, graceful fallbacks
✅ **Accessibility** - Alt text on images, semantic HTML, keyboard navigable
✅ **Performance** - Debouncing, lazy loading, minimal re-renders
✅ **Responsive** - Works on all screen sizes with media queries
✅ **Persistence** - LocalStorage for user preferences (favorites, theme)
✅ **Progressive Enhancement** - Works without JavaScript? No, but graceful degradation
✅ **Version Control** - Regular commits with meaningful messages

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
- **Sprite Images** - PokeAPI GitHub repository (Dream World sprites)
- **Pokémon** - © Nintendo/Creatures Inc./GAME FREAK inc.

## 📄 License

This project is created for educational purposes as part of a web development course assignment.

---
