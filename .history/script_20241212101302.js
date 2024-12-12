// Update the movies data with anime titles and IDs
const movies = [
    { 
        id: 'attack-on-titan',
        image: 'https://cdn.myanimelist.net/images/anime/1948/120625.jpg', 
        title: 'Attack on Titan',
        category: 'Shonen'
    },
    { 
        id: 'demon-slayer',
        image: 'https://cdn.myanimelist.net/images/anime/1286/99889.jpg', 
        title: 'Demon Slayer',
        category: 'Shonen'
    },
    {
        id: 3,
        image: 'https://cdn.myanimelist.net/images/anime/10/78745.jpg',
        title: 'My Hero Academia',
        category: 'Shonen'
    },
    {
        id: 4,
        image: 'https://cdn.myanimelist.net/images/anime/1171/109222.jpg',
        title: 'Jujutsu Kaisen',
        category: 'Shonen'
    },
    {
        id: 5,
        image: 'https://cdn.myanimelist.net/images/anime/12/76049.jpg',
        title: 'One Punch Man',
        category: 'Action'
    },
    {
        id: 6,
        image: 'https://cdn.myanimelist.net/images/anime/9/9453.jpg',
        title: 'Death Note',
        category: 'Psychological'
    }
];

// Create movie element
function createMovieElement(movie) {
    const movieElement = document.createElement('div');
    movieElement.classList.add('movie-item');
    
    // Set background image
    movieElement.style.backgroundImage = `url(${movie.image})`;
    movieElement.style.backgroundSize = 'cover';
    movieElement.style.backgroundPosition = 'center';
    
    // Create movie info
    const movieInfo = document.createElement('div');
    movieInfo.classList.add('movie-info');
    movieInfo.innerHTML = `
        <h3>${movie.title}</h3>
        <span>${movie.category}</span>
        <div class="movie-actions">
            <button class="play-small"><i class="fas fa-play"></i></button>
            <button class="add-to-list"><i class="fas fa-plus"></i></button>
        </div>
    `;
    
    // Use the id instead of the title for the URL
    movieElement.addEventListener('click', () => {
        window.location.href = `watch.html?anime=${movie.id}`;
    });
    
    movieElement.appendChild(movieInfo);
    return movieElement;
}

// Initial population of movies
function populateMovies() {
    const moviesSliders = document.querySelectorAll('.movies-slider');
    
    if (moviesSliders.length === 0) {
        console.error('No movie sliders found');
        return;
    }
    
    moviesSliders.forEach(slider => {
        // Clear existing content
        slider.innerHTML = '';
        
        // Add all movies
        movies.forEach(movie => {
            const movieElement = createMovieElement(movie);
            slider.appendChild(movieElement);
        });
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, populating movies...');
    populateMovies();
    
    // Add category pill click handlers
    const categoryPills = document.querySelectorAll('.category-pill');
    categoryPills.forEach(pill => {
        pill.addEventListener('click', function() {
            const category = this.textContent.trim();
            
            // Update active state
            categoryPills.forEach(p => p.classList.remove('active'));
            this.classList.add('active');
            
            // Filter and display movies
            const filteredMovies = category === 'All' 
                ? movies 
                : movies.filter(movie => movie.category === category);
            
            const moviesSliders = document.querySelectorAll('.movies-slider');
            moviesSliders.forEach(slider => {
                slider.innerHTML = '';
                filteredMovies.forEach(movie => {
                    const movieElement = createMovieElement(movie);
                    slider.appendChild(movieElement);
                });
            });
        });
    });
}); 
async function fetchAnimeData() {
    try {
        // Fetch both popular and upcoming anime concurrently
        const [popularResponse, upcomingResponse] = await Promise.all([
            fetch('https://api.jikan.moe/v4/top/anime?filter=airing'),
            fetch('https://api.jikan.moe/v4/top/anime?filter=upcoming')
        ]);

        const popularData = await popularResponse.json();
        const upcomingData = await upcomingResponse.json();

        // Validate responses and get data
        const popularAnimes = popularData?.data?.slice(0, 10) || []; // Top 10 popular airing
        const incomingAnimes = upcomingData?.data?.slice(0, 10) || []; // Top 10 upcoming

        // Display in respective sections
        displayAnimeList(popularAnimes, '.popular-animes');
        displayAnimeList(incomingAnimes, '.incoming-animes');
    } catch (error) {
        console.error('Error fetching anime data:', error);
    }
}

function displayAnimeList(animeList, containerSelector) {
    const container = document.querySelector(containerSelector);

    if (!container) {
        console.error(`Container not found: ${containerSelector}`);
        return;
    }

    container.innerHTML = animeList.map(anime => `
        <div class="movie-item" onclick="window.location.href='watch.html?anime=${anime.mal_id}'" style="background-image: url('${anime.images.jpg.image_url}'); background-size: cover; background-position: center;">
            <div class="movie-info">
                <h3>${anime.title}</h3>
                <span>${anime.type || 'Unknown'}</span>
                <span>${anime.aired?.string || 'TBA'}</span>
            </div>
        </div>
    `).join('');
}

// Initialize fetching when DOM is loaded
document.addEventListener('DOMContentLoaded', fetchAnimeData);

