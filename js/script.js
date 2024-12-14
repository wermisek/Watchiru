// Update the movies data with anime titles and MAL IDs
const movies = [
    {
        id: 269,  // MAL ID for Bleach
        image: 'https://cdn.myanimelist.net/images/anime/3/40451.jpg',
        title: 'Bleach',
        category: 'Shounen'
    },
    {
        id: 16498,  // MAL ID for Attack on Titan
        image: 'https://cdn.myanimelist.net/images/anime/10/47347.jpg',
        title: 'Attack on Titan',
        category: 'Shounen'
    },
    {
        id: 38000,  // MAL ID for Demon Slayer
        image: 'https://cdn.myanimelist.net/images/anime/1286/99889.jpg',
        title: 'Demon Slayer',
        category: 'Shounen'
    }
];

// Display anime list with duplicate check
function displayAnimeList(animeList, containerSelector) {
    const container = document.querySelector(containerSelector);

    if (!container) {
        console.error(`Container not found: ${containerSelector}`);
        return;
    }

    // Remove duplicates based on mal_id
    const uniqueAnimes = animeList.filter((anime, index, self) =>
        index === self.findIndex((a) => a.mal_id === anime.mal_id)
    );

    container.innerHTML = uniqueAnimes.map(anime => `
        <div class="movie-item" 
             onclick="window.location.href='watch.html?anime=${anime.mal_id}&ep=1'"
             style="background-image: url('${anime.images?.jpg?.large_image_url || anime.images?.jpg?.image_url}'); 
                    background-size: cover; 
                    background-position: center;">
            <div class="movie-info">
                <h3>${anime.title}</h3>
                <div class="meta-info">
                    <span>${anime.type || 'TV'}</span>
                    <span>${anime.score ? `★ ${anime.score}` : ''}</span>
                </div>
                <div class="movie-actions">
                    <button class="play-small" onclick="event.stopPropagation()">
                        <i class="fas fa-play"></i>
                    </button>
                    <button class="add-to-list" onclick="event.stopPropagation()">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Initial population of static movies
function populateStaticMovies() {
    const moviesSliders = document.querySelectorAll('.movies-slider');

    if (moviesSliders.length === 0) {
        console.error('No movie sliders found');
        return;
    }

    moviesSliders.forEach(slider => {
        // Clear existing content
        slider.innerHTML = movies.map(movie => `
            <div class="movie-item" 
                 onclick="window.location.href='watch.html?anime=${movie.id}&ep=1'"
                 style="background-image: url('${movie.image}'); background-size: cover; background-position: center;">
                <div class="movie-info">
                    <h3>${movie.title}</h3>
                    <span>${movie.category}</span>
                    <div class="movie-actions">
                        <button class="play-small"><i class="fas fa-play"></i></button>
                        <button class="add-to-list"><i class="fas fa-plus"></i></button>
                    </div>
                </div>
            </div>
        `).join('');
    });
}

// Fetch anime data
async function fetchAnimeData() {
    try {
        // Add delay between requests to respect API rate limits
        const popularResponse = await fetch('https://api.jikan.moe/v4/top/anime?limit=10&filter=airing&sfw=true&order_by=score');
        await new Promise(resolve => setTimeout(resolve, 1000)); // 1 second delay
        const upcomingResponse = await fetch('https://api.jikan.moe/v4/top/anime?limit=10&filter=upcoming&sfw=true');

        const popularData = await popularResponse.json();
        const upcomingData = await upcomingResponse.json();

        // Get unique containers
        const popularContainer = document.querySelector('.popular-animes');
        const incomingContainer = document.querySelector('.incoming-animes');

        // Clear and update popular anime section
        if (popularContainer) {
            popularContainer.innerHTML = '';
            const popularAnimes = (popularData?.data || []).slice(0, 10);
            displayAnimeList(popularAnimes, '.popular-animes');
        }

        // Clear and update incoming anime section
        if (incomingContainer) {
            incomingContainer.innerHTML = '';
            const incomingAnimes = (upcomingData?.data || []).slice(0, 10);
            displayAnimeList(incomingAnimes, '.incoming-animes');
        }

    } catch (error) {
        console.error('Error fetching anime data:', error);
        handleFetchError();
    }
}

// Add error handling function
function handleFetchError() {
    const popularContainer = document.querySelector('.popular-animes');
    const incomingContainer = document.querySelector('.incoming-animes');

    if (popularContainer && !popularContainer.hasChildNodes()) {
        displayStaticMovies(popularContainer);
    }
    if (incomingContainer && !incomingContainer.hasChildNodes()) {
        displayStaticMovies(incomingContainer);
    }
}

// Update populateStaticMovies to handle single container
function displayStaticMovies(container) {
    if (!container) return;
    
    container.innerHTML = movies.map(movie => `
        <div class="movie-item" 
             onclick="window.location.href='watch.html?anime=${movie.id}&ep=1'"
             style="background-image: url('${movie.image}'); background-size: cover; background-position: center;">
            <div class="movie-info">
                <h3>${movie.title}</h3>
                <span>${movie.category}</span>
                <div class="movie-actions">
                    <button class="play-small"><i class="fas fa-play"></i></button>
                    <button class="add-to-list"><i class="fas fa-plus"></i></button>
                </div>
            </div>
        </div>
    `).join('');
}

// Update hero section with anime data
function updateHeroSection(anime) {
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        const playButton = heroContent.querySelector('.play-btn');
        if (playButton) {
            playButton.onclick = () => {
                window.location.href = `watch.html?anime=${anime.mal_id || 16498}&ep=1`;
            };
        }
    }
}

// Fetch featured anime for hero section
async function fetchFeaturedAnime() {
    try {
        const response = await fetch('https://api.jikan.moe/v4/anime/16498'); // Attack on Titan
        const data = await response.json();
        if (data.data) {
            updateHeroSection(data.data);
        }
    } catch (error) {
        console.error('Error fetching featured anime:', error);
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    fetchAnimeData();
    fetchFeaturedAnime();
});

// Add these new functions

// Scroll to top button
const scrollTop = document.createElement('div');
scrollTop.className = 'scroll-top';
scrollTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
document.body.appendChild(scrollTop);

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollTop.classList.add('visible');
    } else {
        scrollTop.classList.remove('visible');
    }
});

scrollTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Section visibility
const sections = document.querySelectorAll('.section');
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

sections.forEach(section => {
    observer.observe(section);
});

// Add rating to movie cards
function addRatingToCard(card, rating) {
    const stars = '★'.repeat(Math.floor(rating)) + '☆'.repeat(5 - Math.floor(rating));
    const ratingElement = document.createElement('div');
    ratingElement.className = 'rating';
    ratingElement.innerHTML = `
        <span class="stars">${stars}</span>
        <span>${rating.toFixed(1)}</span>
    `;
    card.querySelector('.movie-info').appendChild(ratingElement);
}