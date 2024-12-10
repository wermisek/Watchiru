const animeData = [
    {
        id: 'attack-on-titan',
        title: 'Attack on Titan',
        image: 'https://cdn.myanimelist.net/images/anime/10/47347.jpg',
        type: 'TV',
        year: 2013,
        status: 'Completed'
    },
    // Add more anime entries here
];

// Update createAnimeCard function
function createAnimeCard(anime) {
    return `
        <div class="anime-card" onclick="window.location.href='watch.html?anime=${anime.id}'">
            <img src="${anime.image}" alt="${anime.title}">
            <div class="anime-info">
                <h3>${anime.title}</h3>
                <div class="anime-meta">
                    <span>${anime.type}</span>
                    <span>${anime.year}</span>
                </div>
            </div>
        </div>
    `;
} 