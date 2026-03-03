const games = [
    {
        id: 1,
        title: "Sweet Saga",
        desc: "Interesting space to crush Sweets of different types. Try some of them.",
        tags: ["Action", "Adventure", "Mobile","PC"],
        image: "assets/img/sweetsaga.jpg",
        genre: "action",
        url: "https://stardust-gcd.github.io/Sweet-Saga/"
    },
    {
        id: 2,
        title: "Flappy",
        desc: "Epic Adventure of the flappy bird unending.",
        tags: ["Fantasy", "Adventure","Mobile", "PC"],
        image: "assets/img/flappy.jpg",
        genre: "rpg",
        url: "https://stardust-gcd.github.io/Flappy/"
    },
    {
        id: 3,
        title: "Fruit Slicer",
        desc: "Time to slice the fruits. pick your tool and slice.",
        tags: ["Shooter", "Tactical", "RPG","PC"],
        image: "assets/img/fruitslicer.jpg",
        genre: "shooter",
        url: "https://stardust-gcd.github.io/Fruit-Slicer/"
    },
    {
        id: 4,
        title: "Breakthout",
        desc: "Mystery adventure exploring ancient ruins and forgotten civilizations.",
        tags: ["Adventure", "Puzzle", "Exploration","PC"],
        image: "assets/img/breakthru.jpg",
        genre: "adventure",
        url: "https://stardust-gcd.github.io/Breakout/"
    },
    {
        id: 5,
        title: "Memorize",
        desc: "Can you remember what you saw several minutes ago.",
        tags: ["Strategy", "Mobile", "PC"],
        image: "assets/img/memorize.jpg",
        genre: "action",
        url: "https://stardust-gcd.github.io/Memorize/"
    },
    {
        id: 6,
        title: "Snake",
        desc: "Very active and to the point. Enjoy the fun of having a longer snake.",
        tags: ["Strategy", "RTS", "PC", "Mobile"],
        image: "assets/img/snake.jpg",
        genre: "strategy",
        url: "https://stardust-gcd.github.io/Snake/"
    },
    {
        id: 7,
        title: "Tilting Maze",
        desc: "Retro platformer with modern mechanics and hand-crafted levels.",
        tags: ["Mobile", "PC", "Retro", "Single Player"],
        image: "assets/img/tilting.jpg",
        genre: "adventure",
        url: "https://stardust-gcd.github.io/Tilting-Maze/"
    },
    {
        id: 8,
        title: "Tetris",
        desc: "Competitive MOBA with deep hero customization and strategic teamplay.",
        tags: ["MOBA", "Strategy", "Competitive", "PC"],
        image: "assets/img/tetris.jpg",
        genre: "action",
        url: "https://stardust-gcd.github.io/Tetris/"
    },
    {
        id: 9,
        title: "Space Blaster",
        desc: "It is Battle time. Shoot them all up and don't miss.",
        tags: ["Shooting", "RPG", "PC","Mobile"],
        image: "assets/img/blaster.jpg",
        genre: "shooter",
        url: "https://stardust-gcd.github.io/space-Blaster/"
        
    },
    {
        id: 10,
        title: "Try this Track",
        desc: "Let us move around. Just to discover and learn how the road move.",
        tags: ["Adventure", "racing", "car","PC"],
        image: "assets/img/racing.jpg",
        genre: "rpg",
        url: "https://stardust-gcd.github.io/Try-this-track/"             
        
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

//Original Working Code. Works fine
// function playGame(id) {
//     const game = games.find(g => g.id === id);
//     window.open(game.url, '_blank');
// }

//Sample trial work
function playGame(id) {
    const game = games.find(g => g.id === id);
    window.open(
        game.url,  // Replace with your popup page URL
        'popup',
        'toolbar=no,menubar=no,location=no,status=no,scrollbars=yes,resizable=yes'
        );

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
