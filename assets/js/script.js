const games = [
    {
        id: 1,
        title: "Sweet Saga",
        desc: "Interesting space to crush Sweets of different types. Try some of them.",
        tags: ["Action", "Adventure", "Open World"],
        image: "assets/img/sweetsaga.jpg",
        genre: "action",
        url: "Games/sweetsaga.html"
    },
    {
        id: 2,
        title: "Flappy",
        desc: "Epic Adventure of the flappy bird unending.",
        tags: ["RPG", "Fantasy", "Adventure"],
        image: "assets/img/flappy.jpg",
        genre: "rpg",
        url: "Games/flappy.html"
    },
    {
        id: 3,
        title: "Fruit Slicer",
        desc: "Time to slice the fruits. pick your tool and slice.",
        tags: ["Shooter", "Tactical", "RPG"],
        image: "assets/img/fruitslicer.jpg",
        genre: "shooter",
        url: "Games/slicer.html"
    },
    {
        id: 4,
        title: "Breakthout",
        desc: "Mystery adventure exploring ancient ruins and forgotten civilizations.",
        tags: ["Adventure", "Puzzle", "Exploration"],
        image: "assets/img/breakthru.jpg",
        genre: "adventure",
        url: "Games/breakout.html"
    },
    {
        id: 5,
        title: "Memorize",
        desc: "Can you remember what you saw several minutes ago.",
        tags: ["Racing", "Arcade", "Multiplayer"],
        image: "assets/img/memorize.jpg",
        genre: "action",
        url: "Games/memorize.html"
    },
    {
        id: 6,
        title: "Snake",
        desc: "Very active and to the point. Enjoy the fun of having a longer snake.",
        tags: ["Strategy", "RTS", "Multiplayer"],
        image: "assets/img/snake.jpg",
        genre: "strategy",
        url: "Games/snake.html"
    },
    {
        id: 7,
        title: "Tilting Maze",
        desc: "Retro platformer with modern mechanics and hand-crafted levels.",
        tags: ["Platformer", "Retro", "Single Player"],
        image: "assets/img/tilting.jpg",
        genre: "adventure",
        url: "Games/tilting.html"
    },
    {
        id: 8,
        title: "Tetris",
        desc: "Competitive MOBA with deep hero customization and strategic teamplay.",
        tags: ["MOBA", "Competitive", "Team-Based"],
        image: "assets/img/tetris.jpg",
        genre: "action",
        url: "Games/tetris.html"
    }
];

function createGameCard(game) {
    return `
        <div class="game-card" data-genre="${game.genre}">
            <img src="${game.image}" alt="${game.title}" class="game-image">
            <h3 class="game-title">${game.title}</h3>
            <p class="game-desc">${game.desc}</p>
            <div class="game-tags">
                ${game.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
            <button class="play-btn" onclick="playGame(${game.id})">▶ Load Game</button>
        </div>
    `;
}

function renderGames(filteredGames = games) {
    document.getElementById('gameGrid').innerHTML = filteredGames.map(createGameCard).join('');
}

function filterGames(genre) {
    const filtered = genre === 'all' ? games : games.filter(game => game.genre === genre);
    renderGames(filtered);
}

function playGame(id) {
    const game = games.find(g => g.id === id);
    window.open(game.url, '_blank');
}

// Filter functionality
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        filterGames(btn.dataset.filter);
    });
});

// Smooth scrolling for nav links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Initial render
renderGames();

// Intersection Observer for scroll animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
});

// Re-observe cards after rendering
setTimeout(() => {
    document.querySelectorAll('.game-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}, 100);
