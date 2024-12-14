document.addEventListener('DOMContentLoaded', async function() {
    // Initialize intersection observer for animations
    const sections = document.querySelectorAll('.section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => observer.observe(section));

    // Fetch data for different sections
    try {
        await Promise.all([
            fetchTrending(),
            fetchUpcoming(),
            fetchTopRated(),
            fetchSeasonal()
        ]);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
});

async function fetchTrending() {
    const response = await fetch('https://api.jikan.moe/v4/top/anime?filter=airing&limit=12');
    const data = await response.json();
    displayAnime(data.data, '.trending-grid', true);
    await new Promise(resolve => setTimeout(resolve, 1000)); // API rate limiting
}

async function fetchUpcoming() {
    const response = await fetch('https://api.jikan.moe/v4/top/anime?filter=upcoming&limit=12');
    const data = await response.json();
    displayAnime(data.data, '.upcoming-grid');
    await new Promise(resolve => setTimeout(resolve, 1000));
}

async function fetchTopRated() {
    const response = await fetch('https://api.jikan.moe/v4/top/anime?filter=bypopularity&limit=12');
    const data = await response.json();
    displayAnime(data.data, '.top-rated-grid', false, true);
    await new Promise(resolve => setTimeout(resolve, 1000));
}

async function fetchSeasonal() {
    const response = await fetch('https://api.jikan.moe/v4/seasons/now');
    const data = await response.json();
    displayAnime(data.data.slice(0, 12), '.seasonal-grid');
}

function displayAnime(animes, containerSelector, showTrending = false, showRank = false) {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    container.innerHTML = animes.map((anime, index) => `
        <div class="anime-card" onclick="window.location.href='watch.html?anime=${anime.mal_id}&ep=1'">
            ${showRank ? `<div class="rank-badge">#${index + 1}</div>` : ''}
            ${showTrending ? `
                <div class="trending-badge">
                    <i class="fas fa-fire"></i>
                    Trending
                </div>
            ` : ''}
            <img src="${anime.images.jpg.large_image_url}" alt="${anime.title}" 
                 style="width: 100%; aspect-ratio: 2/3; object-fit: cover;">
            <div class="anime-info">
                <h3>${anime.title}</h3>
                <div class="anime-meta">
                    <span>${anime.type || 'TV'}</span>
                    <span>${anime.score ? `★ ${anime.score}` : ''}</span>
                </div>
            </div>
        </div>
    `).join('');
} 